import React from 'react';
// modules
import { Group } from '../../modules';
// hooks
import { useData } from '../../../hooks';
// styles
import styles from './styles.module.scss';



const GroupList = () => {
	const { groups } = useData();
	
	return (
		<div className={styles.content}>
			{
				groups.map(group => (
					<Group key={group._id} group={group} />
				))
			}
		</div>
	);
};



export default GroupList;
