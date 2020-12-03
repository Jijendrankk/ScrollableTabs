import React from 'react';
import style from './index.module.css';

const Modal = (props) => {
	return (
		<div className={props.show ? style.displayBlock : style.displayNone}>
			<section className={style.modalMain}>
				<div className={style.titleLabel}>{props.titleLabel}</div>
				{props.children}
				<div className={style.btnContainer}>
					<button className={style.closeBtn} onClick={props.handleClose}>
						Close
					</button>
					<button className={style.removeBtn} onClick={props.handleRemove}>
						Remove
					</button>
				</div>
			</section>
		</div>
	);
};

export default Modal;
