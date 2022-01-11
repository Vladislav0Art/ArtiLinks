import React, { useState } from 'react';
// elements
import { Input, Button } from '../../elements';
// hooks
import { useData } from '../../../hooks';
// modals
import { AddBookmarkModal } from '../../modals';
// defaults
import { unsortedCollection, allBookmarksCollection } from '../../../utils/defaults/default-collections';
// styles
import styles from './styles.module.scss';
// images
import defaultCollectionIcon from '/public/svg/dashboard/default-collection-icon.svg';



const DashboardPanel = () => {
	const {
		viewedCollection,
		searchValue,
		onSearch
	} = useData();

	const [isAddBookmarkModalVisible, setIsAddBookmarkModalVisible] = useState(false);

	// toggling adding bookmark modal
	const toggleAddBookmarkModalVisibility = () => setIsAddBookmarkModalVisible(prevState => !prevState);

	return (
		<React.Fragment>
			<div className={styles.panel}>
				<div className={styles.align}>
					<div className={styles.inputContainer}>
						<Input 
							placeholder='Search for links...'
							name='search'
							value={searchValue}
							onChange={onSearch}
							classNames={[styles.input]}
						/>
					</div>

					{
						// if viewed collection is not default one
						(viewedCollection._id !== unsortedCollection._id &&
						viewedCollection._id !== allBookmarksCollection._id) &&
						<Button onClick={toggleAddBookmarkModalVisibility}>Add bookmark</Button>
					}
				</div>

				<div className={styles.align}>
					<div className={styles.collection}>
						<img 
							src={ viewedCollection.icon ? viewedCollection.icon : defaultCollectionIcon.src } 
							alt="Collection icon"
						/>
						<h5>{ viewedCollection.label }</h5>		
					</div>
					
					<div className={styles.options}>
						<span>Sort by</span>
						<span>View</span>
					</div>
				
				</div>
			</div>

			<AddBookmarkModal
				isVisible={isAddBookmarkModalVisible}
				toggleVisibility={toggleAddBookmarkModalVisibility}
			/>
		</React.Fragment>
	);
}

export default DashboardPanel;
