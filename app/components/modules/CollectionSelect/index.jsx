import React, { useState, useContext } from 'react';
// modules
import { BookmarkModalGroup } from '../../modules';
// elements
import { Input, BookmarkModalCollection } from '../../elements';
// contexts
import { FormContext } from '../../../contexts';
// hooks
import { useInput } from '../../../hooks';
// utils/defaults
import defaultCollections from '../../../utils/defaults/default-collections';
// hooks
import { useData } from '../../../hooks';
// styles
import styles from './styles.module.scss';



const CollectionSelect = () => {
	const { groups, collections, bookmarks } = useData();
	const { form, handleCollectionSelect } = useContext(FormContext);
	
	// value of search input
	const { value: searchValue, onChange: onSearchChange } = useInput('');

	// setting unsorted collection as state
	const [unsortedCollection, setUnsortedCollection] = useState({
		...defaultCollections.unsortedCollection,
		// counting unsorted bookmarks
		bookmarksCount: bookmarks.filter(bookmark => !bookmark.collectionId).length
	});
	
	// viewed collections are collections that are rendered
	const [viewedCollections, setViewedCollections] = useState(collections);

	

	// filtering viewed collection according to search input value
	function filterViewedCollections(event) {
		// changing state of search input
		onSearchChange(event);

		// trimming and lowercasing search input value
		const value = event.target.value.trim().toLowerCase();

		// filtering collections depending on search input value
		setViewedCollections(collections.filter(collection => (
			collection.label.toLowerCase().includes(value) || !value
		)));
	}

	return (
		<div className={styles.container}>
			<span className={styles.title}>Select collection</span>

			<div className={styles.top}>
				<Input
					placeholder='Search for collection...'
					value={searchValue}
					name='search'
					onChange={filterViewedCollections}
					classNames={[styles.search]}
				/>

				<BookmarkModalCollection
					collection={unsortedCollection}
					selected={form.selectedCollectionId === unsortedCollection._id || form.selectedCollectionId === null}
					onClick={() => handleCollectionSelect(unsortedCollection._id)}
				/>
			</div>

			<div className={styles.groups}>
				{
					groups.map(group => {
						// filtering out collections of current group from all collections 
						const filteredCollections = viewedCollections.filter(collection => collection.groupId === group._id);
						
						// if current group does not have any collections after filtering
						if(filteredCollections.length <= 0) {
							return null;
						}

						return (
							<BookmarkModalGroup
								key={group._id}
								label={group.label}
								collections={filteredCollections}
								selectedCollectionId={form.selectedCollectionId}
								onCollectionClick={handleCollectionSelect}
							/>
						);
					})
				}
			</div>


		</div>
	);
};



export default CollectionSelect;
