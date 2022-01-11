import React from 'react';
// modules
import { Sidebar, DashboardContent } from '../../modules';
// styles
import styles from './styles.module.scss';


const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<DashboardContent />
		</div>
	);
};


export default Dashboard;
