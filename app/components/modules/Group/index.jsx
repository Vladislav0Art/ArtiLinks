import React, { useState } from 'react';
import PropTypes from 'prop-types';
// modules
import { CollectionList, GroupFloatingWindow } from '../../modules';
// modals
import { RenameGroupModal, AddCollectionModal } from '../../modals';
// hooks
import { useData, useNotification } from '../../../hooks';
// styles 
import styles from './styles.module.scss';
// images
import dotsIcon from '/public/svg/dashboard/dots-icon.svg';
import caretIcon from '/public/svg/dashboard/caret-down.svg';



const Group = ({ group }) => {
	const { _id: id, label, isVisible } = group;
	
	const { 
		collections, 
		deleteGroup, 
		deleteEmptyCollections
	} = useData();
	
	const { 
		addErrorNotification,
		addWarningNotification,
		addInfoNotification, 
		removeNotification
	} = useNotification();

	const [isFloatingWindowOpened, setIsFloatingWindowOpened] = useState(false);
	const [isRenameGroupModalVisible, setIsRenameGroupModalVisible] = useState(false);
	const [isAddCollectionModalVisible, setIsAddCollectionModalVisible] = useState(false);

	// toggling floating window of dots icon button
	const toggleFloatingWindow = () => setIsFloatingWindowOpened(prevState => !prevState);


	// toggling rename group modal visibility
	const toggleRenameGroupModalVisibility = () => setIsRenameGroupModalVisible(prevState => !prevState);

	// toggling add collection modal visibility
	const toggleAddCollectionModalVisibility = () => setIsAddCollectionModalVisible(prevState => !prevState);


	// handling group deletion
	const handleDeleteGroup = async () => {
		try {
			// deleting group from db
			await deleteGroup({ groupId: id });
			// removing notification after success
			removeNotification();
		}
		catch(err) {
			console.error(err);
		}
	};


	// handling empty collections deletion
	const handleRemoveEmptyCollections = async () => {
		// delay for awaiting before next showing notification
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		
		try {
			// deleting empty collections
			const deletedCollectionsCount = await deleteEmptyCollections({ groupId: id });
			// removing notification after success
			await removeNotification();			
			// awaiting to get smooth notification animation
			await delay(250);
			// showing info notification
			addInfoNotification({
				title: `${deletedCollectionsCount} collection${deletedCollectionsCount > 1 ? 's' : ''} removed`,
				message: 'Press OK button to proceed.'
			});
		}
		catch(err) {
			// removing notification of deletion warning
			await removeNotification();			
			// awaiting to get smooth notification animation
			await delay(250);
			// adding error notification
			addErrorNotification({
				message: err.message
			});
			console.error(err);
		}
	};


	// setting warning notification of removing group 
	const onRemoveGroup = () => addWarningNotification({
		title: 'Are you sure?', 
		message: 'This action will delete the group, all collections that are associated with it and all bookmarks in these collections.' 
	}, handleDeleteGroup);


	// setting warning notification of removing all empty collections of group
	const onRemoveEmptyCollections = () => addWarningNotification({
		title: 'Are you sure?',
		message: 'This action will remove all collections that do not have any bookmarks.'
	}, handleRemoveEmptyCollections);


	return (
		<React.Fragment>
			<div className={styles.content}>
				<div className={styles.group}>
					<div className={styles.caret}><img src={caretIcon.src} alt="Caret icon" /></div>
					<span>{ label }</span>
					<div onClick={toggleFloatingWindow} className={styles.dots}>
						<img src={dotsIcon.src} alt="Dots icon"/>
					</div>
				</div>

				<div className={styles.floatingWindow}>
					<GroupFloatingWindow 
						transitionIn={isFloatingWindowOpened}
						onRemove={onRemoveGroup}
						onRename={toggleRenameGroupModalVisibility}
						onCreateCollection={toggleAddCollectionModalVisibility}
						onRemoveEmptyCollections={onRemoveEmptyCollections}
					/>
				</div>

				<div className={styles.collectionList}>
					<CollectionList collections={collections.filter(collection => collection.groupId === id)} />
				</div>
			</div>

			<RenameGroupModal
				isVisible={isRenameGroupModalVisible}
				toggleVisibility={toggleRenameGroupModalVisibility}
				group={group}
			/>

			<AddCollectionModal
				groupId={group._id}
				isVisible={isAddCollectionModalVisible}
				toggleVisibility={toggleAddCollectionModalVisibility}
			/>

		</React.Fragment>
	);
};


// prop types
const requiredString = PropTypes.string.isRequired;

Group.propTypes = {
	group: PropTypes.shape({
		_id: requiredString,
		label: requiredString,
		isVisible: PropTypes.bool.isRequired
	}),
};


export default Group;
