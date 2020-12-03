import React, { useState, useRef } from 'react';
import style from './index.module.css';
import Modal from '../../Shared/Modal';

const ScrollableTabs = (props) => {
	const [activeTabIndex, setActiveTab] = useState(1);
	const [showCrossBtnIndex, setCrossBtnStatus] = useState(-1);
	const [showModal, setModalStatus] = useState(false);
	const [removeTabIndex, SetRemoveTabIndex] = useState(-1);
	const [showLeftArrow, setLeftArrowStatus] = useState(false);
	const [showRightArrow, setRightArrowStatus] = useState(false);
	const refDetails = useRef(null);
	const activeTab = (id) => () => {
		props.activeTabIndex(id);
		setActiveTab(id);
	};
	const showCrossBtn = (index) => () => {
		setCrossBtnStatus(index);
	};

	const onDragStart = (event, tab) => {
		event.dataTransfer.setData('tabFrom', tab.id);
	};
	const onDragOver = (event) => {
		event.preventDefault();
	};

	const onDrop = (event) => {
		if (event.dataTransfer.getData('tabFrom') && event.target.id) {
			let tabData = [...props.tabData];
			let removedData = tabData.filter((tab) => tab.id !== Number(event.dataTransfer.getData('tabFrom')));
			let toIndex = '';
			removedData.map((tab, index) => {
				if (tab.id === Number(event.target.id)) toIndex = index;
			});
			let dragandDropData = removedData.reduce((a, b, index) => {
				if (index === toIndex)
					a.push({
						tabContent: `Tab${event.dataTransfer.getData('tabFrom')} container`,
						id: Number(event.dataTransfer.getData('tabFrom')),
					});
				a.push(b);
				return a;
			}, []);
			props.updatedTabData(dragandDropData);
		}
	};
	const renderTabs = () => {
		return (
			props.tabData &&
			props.tabData.length !== 0 &&
			props.tabData.map((tab, index) => {
				return (
					<div
						key={index}
						className={activeTabIndex === tab.id ? style.activeTabLabel : style.tabLabel}
						onClick={activeTab(tab.id)}
						onMouseEnter={showCrossBtn(index)}
						onMouseLeave={() => setCrossBtnStatus(-1)}
						onDragStart={(event) => onDragStart(event, tab)}
						draggable
						id={tab.id}
					>
						<div id={tab.id}>{`Tab` + tab.id}</div>
						{showCrossBtnIndex === index && props.tabData.length !== 1 ? (
							<div className={style.removeTabBtn} onClick={(e) => removeTab(e, index, tab.id)}>
								X
							</div>
						) : (
							<div className={style.removeTabBtn} />
						)}
					</div>
				);
			})
		);
	};
	const removeTab = (e, index) => {
		e.preventDefault();
		e.stopPropagation();
		setModalStatus(true);
		SetRemoveTabIndex(index);
	};
	const newTabIndex = () => {
		let newTabIndex = 1;
		let ids = props.tabData.map((tab) => tab.id);
		for (let initial = 1; initial <= props.maxTabs; initial++) {
			if (!ids.includes(initial)) {
				newTabIndex = initial;
				break;
			}
		}
		return newTabIndex;
	};
	const addNewTab = () => {
		let tabData = [...props.tabData];
		let newTabData = { tabContent: `Tab${newTabIndex()} container`, id: newTabIndex() };
		tabData.push(newTabData);
		props.updatedTabData(tabData);
		setCrossBtnStatus(-1);
		setArrowStatus();
	};
	const hideModal = () => {
		setModalStatus(false);
	};
	const removeTabFromModal = () => {
		let tabData = [...props.tabData];
		tabData.splice(removeTabIndex, 1);
		props.updatedTabData(tabData);
		setModalStatus(false);
		setArrowStatus();
	};
	const scrollToRight = () => {
		refDetails.current.scrollLeft += 72;
		setArrowStatus();
	};
	const scrollToLeft = () => {
		refDetails.current.scrollLeft -= 72;
		setArrowStatus();
	};
	const scrollAction = () => {
		setArrowStatus();
	};
	const setArrowStatus = () => {
		if (refDetails.current) {
			setLeftArrowStatus(
				refDetails.current.scrollWidth > refDetails.current.clientWidth && refDetails.current.scrollLeft !== 0
			);
			setRightArrowStatus(
				Math.abs(
					parseInt(refDetails.current.clientWidth + refDetails.current.scrollLeft) -
						refDetails.current.scrollWidth
				) <= 2
					? false
					: refDetails.current.scrollWidth > refDetails.current.clientWidth &&
							parseInt(refDetails.current.clientWidth + refDetails.current.scrollLeft) !==
								refDetails.current.scrollWidth
			);
		}
	};
	return (
		<div className={style.ScrollableTabsContainer}>
			{showLeftArrow ? (
				<div className={style.btnBlock} onClick={scrollToLeft}>
					&#8249;
				</div>
			) : null}
			<div
				className={style.tabBlock}
				onDragOver={(event) => onDragOver(event)}
				onDrop={(event) => {
					onDrop(event);
				}}
				ref={refDetails}
				onScroll={scrollAction}
			>
				{renderTabs()}
			</div>
			{showRightArrow ? (
				<div className={style.btnBlock} onClick={scrollToRight}>
					&#8250;
				</div>
			) : null}
			<div
				className={props.tabData.length === props.maxTabs ? style.addBtnDisable : style.btnBlock}
				onClick={addNewTab}
			>
				+
			</div>
			<Modal
				show={showModal}
				titleLabel={'Remove Action'}
				handleClose={hideModal}
				handleRemove={removeTabFromModal}
			>
				<div className={style.modalActionLabel}>Are you want to remove this tab?</div>
			</Modal>
		</div>
	);
};

export default ScrollableTabs;
