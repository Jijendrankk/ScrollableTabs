import React from 'react';
import style from './index.module.css';
import TabDetail from '../TabDetails';

const DemoContainer = () => {
	return (
		<div className={style.demoContainer}>
			<div className={style.demoContainerLabel}>Demo Container</div>
			<TabDetail />
		</div>
	);
};

export default DemoContainer;
