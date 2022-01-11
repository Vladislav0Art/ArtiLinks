import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// hooks
import { useData, useNotification } from '../../../hooks';
// modals
import { ChangeBookmarkModal } from '../../modals';
// elements
import { Bookmark } from '../../elements';
// styles
import styles from './styles.module.scss';



const BookmarkList = ({ viewMode }) => {
	const { viewedBookmarks, deleteBookmark } = useData();

	const viewModes = {
		list: 'list',
		card: 'card',
		headline: 'headline',
	};

	const { 
		addWarningNotification, 
		removeNotification,
		addInfoNotification,
	} = useNotification();


	const containerClassNames = classNames({
		[styles.wrapper]: true,
		[styles.wrapperList]: viewMode === viewModes.list,
		[styles.wrapperCard]: viewMode === viewModes.card,
		[styles.wrapperHeadline]: viewMode === viewModes.headline,
	});

	// delay function
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	// handling bookmark deletion request
	const handleBookmarkDelete = async (bookmarkId) => {
		try {
			// deleting bookmark from db
			await deleteBookmark({ bookmarkId });
			// removing warning notification
			await removeNotification();
			// delaying showing info notification
			await delay(250);
			// showing info notification
			addInfoNotification({
				title: 'Bookmark deleted successfully',
				message: 'Press OK button to proceed'
			});
		}
		catch(err) {
			console.error(err);
		}
	};


	return (
		<React.Fragment>
			<div className={containerClassNames}>
				{viewedBookmarks.map(bookmark => 
					<Bookmark 
						key={bookmark._id}
						bookmark={bookmark}
						mode={viewMode}
						onDelete={() => addWarningNotification({
							title: 'Are you sure?',
							message: 'This action will permanently delete selected bookmark'
						}, () => handleBookmarkDelete(bookmark._id))}
					/>
				)}
			</div>
		</React.Fragment>
	);
};


// prop types
BookmarkList.propTypes = {
	viewMode: PropTypes.oneOf(['list', 'card', 'headline'])
};


export default BookmarkList;
