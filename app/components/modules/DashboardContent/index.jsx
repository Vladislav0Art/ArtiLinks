import React from 'react';
// modules
import { BookmarkList, DashboardPanel } from '../../modules';
// styles
import styles from './styles.module.scss';



const DashboardContent = () => {
	return (
		<div className={styles.container}>
			<DashboardPanel />

			<div className={styles.content}>
				<BookmarkList viewMode={"list"} />
			</div>
		</div>
	);
}

export default DashboardContent;
