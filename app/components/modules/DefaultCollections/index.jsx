import React from 'react';
// elements
import { CollectionItem } from '../../elements';
// hooks
import { useData } from '../../../hooks';
// utils/defaults
import defaultCollections from '../../../utils/defaults/default-collections';
// styles 
import styles from './styles.module.scss';




const DefaultCollections = () => {
	const { bookmarks, viewedCollection, setViewedCollectionAndBookmarks } = useData();

	// default collection for all bookmarks
	const allBookmarksCollection = {
		...defaultCollections.allBookmarksCollection,
		bookmarksCount: bookmarks.length
	};

	// default collection for unsorted bookmarks 
	const unsortedBookmarksCollection = {
		...defaultCollections.unsortedCollection,
		bookmarksCount: bookmarks.filter(bookmark => bookmark.collectionId === null).length
	};

	return (
		<div className={styles.content}>
			<CollectionItem 
				collection={allBookmarksCollection}
				viewedCollectionId={viewedCollection._id}
				onCollectionClick={() => setViewedCollectionAndBookmarks(allBookmarksCollection._id)}
				disableActions
			/>
			<CollectionItem 
				collection={unsortedBookmarksCollection}
				viewedCollectionId={viewedCollection._id}
				onCollectionClick={() => setViewedCollectionAndBookmarks(unsortedBookmarksCollection._id)}
				disableActions
			/>
		</div>
	);
}

export default DefaultCollections;
