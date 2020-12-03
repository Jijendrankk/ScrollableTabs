import React, { useState } from 'react';
import ScrollableTabs from '../ScrollableTabs';
import style from './index.module.css';
const initialTabData = [
	{ tabContent: 'Tab1 container', id: 1 },
	{ tabContent: 'Tab2 container', id: 2 },
	{ tabContent: 'Tab3 container', id: 3 },
];
const TabDetail = () => {
	const [tabData, setTabData] = useState(initialTabData);
	const [activeTabIndex, setActiveTabIndex] = useState(1);
	const updateTab = (tabData) => {
		setTabData(tabData);
	};
	const currentSelectedTab = (tabId) => {
		setActiveTabIndex(tabId);
	};
	const renderTabContent = () => {
		let tabContentData = tabData.length !== 0 && tabData.filter((tab) => tab.id === activeTabIndex);
		return (tabContentData.length !== 0 && tabContentData[0].tabContent) || '';
	};
	return (
		<div>
			<ScrollableTabs
				tabData={tabData}
				updatedTabData={updateTab}
				activeTabIndex={currentSelectedTab}
				maxTabs={10}
			/>
			<div className={style.tabDetail}>{renderTabContent()}</div>
		</div>
	);
};

export default TabDetail;
