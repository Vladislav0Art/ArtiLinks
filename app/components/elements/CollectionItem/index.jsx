import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// modules
import { CollectionFloatingWindow } from '../../modules';
// hooks
import { useData, useNotification } from '../../../hooks';
// modals
import { 
	RenameCollectionModal, 
	ChangeCollectionIconModal,
	ChangeGroupModal
} from '../../modals'; 
// styles
import styles from './styles.module.scss';
// images
import dotsIcon from '/public/svg/dashboard/dots-icon.svg';
import defaultCollectionIcon from '/public/svg/dashboard/default-collection-icon.svg';




const CollectionItem = ({
	collection,
	viewedCollectionId,
	onCollectionClick,
	disableActions
}) => {
	const { icon, label, bookmarksCount } = collection;

	const [isFloatingWindowOpened, setIsFloatingWindowOpened] = useState(false);

	const [isRenameCollectionModalVisible, setIsRenameCollectionModalVisible] = useState(false);
	const [isChangeCollectionIconModalVisible, setIsChangeCollectionIconModalVisible] = useState(false);
	const [isChangeGroupModalVisible, setIsChangeGroupModalVisible] = useState(false);

	const { 
		addWarningNotification,
		addInfoNotification, 
		removeNotification
	} = useNotification();

	const { groups, deleteCollection } = useData();


	// toggling floating window of dots icon button
	const toggleFloatingWindow = () => setIsFloatingWindowOpened(prevState => !prevState);

	// toggling rename collection modal
	const toggleRenameCollectionModalVisibility = () => setIsRenameCollectionModalVisible(prevState => !prevState);

	// toggling change collection icon modal
	const toggleChangeCollectionIconModalVisibility = () => setIsChangeCollectionIconModalVisible(prevState => !prevState);

	// toggling change group of collection modal
	const toggleChangeGroupModalVisibility = () => setIsChangeGroupModalVisible(prevState => !prevState);


	// deleting collection in db
	const handleCollectionDelete = async () => {
		const collectionId = collection._id;
		// delay for awaiting before next showing notification
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		try {
			// deleting collection and associated bookmarks
			const movedToUnsortedCollectionBookmarksCount = await deleteCollection({ collectionId });
			// removing warning notification after successful request
			await removeNotification();
			// delaying before showing info notification
			await delay(250);
			// showing info notification
			const showPlural = movedToUnsortedCollectionBookmarksCount > 1 || !movedToUnsortedCollectionBookmarksCount;
			addInfoNotification({
				title: 'Collection successfully deleted',
				message: `${movedToUnsortedCollectionBookmarksCount} bookmark${ showPlural ? 's' : '' } ${ showPlural ? 'are' : 'is' } set to Unsorted collection`
			});
		}
		catch(err) {
			console.error(err);
		}
	};

	// adding collection deletion warning notification
	const onRemoveCollection = () => addWarningNotification({
		title: 'Are you sure?',
		message: 'This action will remove the collection, and associated bookmarks will be set to Unsorted collection.'
	}, handleCollectionDelete);

	return (
		<React.Fragment>
			<div
				onClick={onCollectionClick} 
				className={classNames({
					[styles.content]: true,
					[styles.selected]: viewedCollectionId === collection._id
				})}
			>
				<div className={styles.main}>
					<img 
						className={styles.icon} 
						width={24}
						height={24} 
						src={icon ? icon : defaultCollectionIcon.src} 
						alt="Collection icon"
					/>
					<span>{ label }</span>

					{
						!disableActions && 
						<div onClick={toggleFloatingWindow} className={styles.dots}>
							<img src={dotsIcon.src} alt="Dots icon" />
						</div>
					}
				</div>
				<span className={styles.bookmarksCount}>{ bookmarksCount }</span>
			</div>

			{
				!disableActions &&
				<React.Fragment>
					<CollectionFloatingWindow 
						transitionIn={isFloatingWindowOpened}
						onRename={toggleRenameCollectionModalVisibility}
						onIconChange={toggleChangeCollectionIconModalVisibility}
						onRemove={onRemoveCollection}
						onGroupChange={toggleChangeGroupModalVisibility}
					/>

					<RenameCollectionModal
						isVisible={isRenameCollectionModalVisible}
						toggleVisibility={toggleRenameCollectionModalVisibility}
						collection={collection}
					/>

					<ChangeCollectionIconModal
						isVisible={isChangeCollectionIconModalVisible}
						toggleVisibility={toggleChangeCollectionIconModalVisibility}
						collectionId={collection._id}
					/>

					<ChangeGroupModal
						isVisible={isChangeGroupModalVisible}
						toggleVisibility={toggleChangeGroupModalVisibility}
						collection={collection}
						groups={groups}
					/>
				</React.Fragment>
			}
		</React.Fragment>
	);
};


// default props
CollectionItem.defaultProps = {
	disableActions: false
};

// prop types
CollectionItem.propTypes = {
	collection: PropTypes.shape({
		icon: PropTypes.string,
		label: PropTypes.string.isRequired,
		bookmarksCount: PropTypes.number.isRequired,
	}).isRequired,
	viewedCollectionId: PropTypes.string.isRequired,
	disableActions: PropTypes.bool.isRequired,
	onCollectionClick: PropTypes.func.isRequired,	
};


export default CollectionItem;
