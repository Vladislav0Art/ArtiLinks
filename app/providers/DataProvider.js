import { useState } from 'react';
import PropTypes from 'prop-types';
// services
import GroupService from '../utils/client-services/GroupService';
import CollectionService from '../utils/client-services/CollectionService';
import BookmarkService from '../utils/client-services/BookmarkService';
// utils/defaults
import { unsortedCollection, allBookmarksCollection } from '../utils/defaults/default-collections';
// contexts
import { DataContext } from '../contexts';


const DataProvider = ({ children, data }) => {
	const [groups, setGroups] = useState(data.groups);
	const [collections, setCollections] = useState(data.collections);
	const [bookmarks, setBookmarks] = useState(data.bookmarks);

	// viewed collection
	const [viewedCollection, setViewedCollection] = useState(allBookmarksCollection);
	// bookmarks of viewed collection
	const [viewedBookmarks, setViewedBookmarks] = useState(bookmarks);
	// search input state
	const [searchValue, setSearchValue] = useState('');


	// filtering bookmarks by collection id
	const filterBookmarksByCollectionId = (collectionId) => {
		let result = null;
		// if viewed collection is collection with all bookmarks
		if(collectionId === allBookmarksCollection._id) {
			result = bookmarks;
		}
		// if view collection is collection with unsorted bookmarks
		else if(collectionId === unsortedCollection._id) {
			result = bookmarks.filter(bookmark => bookmark.collectionId === null);
		}
		else {
			// filtering bookmarks with collection id equal to viewed collection id
			result = bookmarks.filter(bookmark => bookmark.collectionId === collectionId);
		}

		return result;
	};


	// getting collection by collection id 
	const getCollectionById = (collectionId) => {
		let result = null;
		// if viewed collection is collection with all bookmarks
		if(collectionId === allBookmarksCollection._id) {
			result = allBookmarksCollection;
		}
		// if viewed collection is collection with unsorted bookmarks
		else if(collectionId === unsortedCollection._id) {
			result = unsortedCollection;
		}
		// finding viewed collection in collections array
		else {
			result = collections.find(collection => collection._id === collectionId);
		}

		return result;
	};


	// setting viewed collection id and viewed bookmarks
	const setViewedCollectionAndBookmarks = (collectionId) => {
		const resultBookmarks = filterBookmarksByCollectionId(collectionId);
		// finding current viewed collection
		const currentViewedCollection = getCollectionById(collectionId);
		
		// setting viewed collection
		setViewedCollection(currentViewedCollection);
		// setting viewed bookmarks
		setViewedBookmarks(resultBookmarks);
	};


	// setting search input value and filtering bookmarks according to input search value
	const onSearch = (event) => {
		// setting input value to create controlled input
		setSearchValue(event.target.value);
		
		// trimming and lowercasing search input value
		const value = event.target.value.trim().toLowerCase();

		// filtering bookmarks by domain and title according to value of input
		setViewedBookmarks(bookmarks.filter(bookmark => (
			bookmark.data.domain.toLowerCase().includes(value)  || 
			bookmark.data.title.toLowerCase().includes(value) ||
			!value
		)));
	};


	// groups CRUD:

	// creating group in db and adding created group in state
	const createGroup = (data) => new Promise((resolve, reject) => {
		// calling api endpoint
		GroupService.createGroup(data)
			.then(({ data: group }) => {
				// setting new group in
				setGroups(prevState => ([ group, ...prevState ]));
				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// deleting group from db and deleting it from state
	const deleteGroup = ({ groupId }) => new Promise((resolve, reject) => {
		// calling api endpoint
		GroupService.deleteGroup({ groupId })
			.then(({ data }) => {
				// extracting deleted data
				const { 
					collections: deletedCollections, 
					bookmarks: deletedBookmarks
				} = data;
				
				// deleting group from state
				setGroups(prevState => prevState.filter(group => group._id !== groupId));

				// deleting state bookmarks that present in deleted bookmarks received from api
				setBookmarks(prevState => prevState.filter(bookmark => (
					!deletedBookmarks.find(deletedBookmark => deletedBookmark._id === bookmark._id)
				)));

				// deleting state viewed bookmarks that present in deleted bookmarks
				setViewedBookmarks(prevState => prevState.filter(bookmark => (
					!deletedBookmarks.find(deletedBookmark => deletedBookmark._id === bookmark._id)
				)));

				// if viewed collection was deleted set viewed collection to 'all bookmarks' collection
				if(deletedCollections.find(deletedCollection => deletedCollection._id === viewedCollection._id)) {
					setViewedCollection(allBookmarksCollection);
				}

				// deleting state collection that present in deleted collections received from api
				setCollections(prevState => prevState.filter(collection => (
					!deletedCollections.find(deletedCollection => deletedCollection._id === collection._id)
				)));

				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// updating group in db with provided data
	const updateGroup = (data) => new Promise((resolve, reject) => {
		// calling api endpoint
		GroupService.updateGroup(data)
			.then(({ data }) => {
				// filtering other groups and adding updated one
				setGroups(prevState => prevState.map(group => group._id !== data._id ? group : data));
				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// collections CRUD:

	// creating collection in db and adding created collection in state
	const createCollection = (data) => new Promise((resolve, reject) => {
		CollectionService.createCollection(data)
			.then(({ data }) => {
				// setting created collection in state
				setCollections(prevState => ([data, ...prevState]));
				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// deleting collection db and removing it from state
	const deleteCollection = (data) => new Promise((resolve, reject) => {
		CollectionService.deleteCollection(data)
			.then(({ data }) => {
				const { collection: deletedCollection, bookmarks: updatedBookmarks } = data; 
				
				// excluding deleted collection from collections state
				setCollections(prevState => prevState.filter(collection => collection._id !== deletedCollection._id));

				// updating collectionId of bookmarks in state
				setBookmarks(prevState => prevState.map(bookmark => {
					// checking if current bookmark has been updated: its collectionId set to null 
					const updated = updatedBookmarks.find(updatedBookmark => updatedBookmark._id === bookmark._id);

					// if bookmark has been updated, then set its collectionId to null
					if(updated) {
						return { ...bookmark, collectionId: null };
					}
					else {
						return bookmark;
					}
				}));

				// if current viewed collection is the deleted collection
				if(viewedCollection._id === deletedCollection._id) {
					// setting viewed collection to 'All bookmarks' collection
					setViewedCollection(allBookmarksCollection);
					// setting viewed collections to all bookmarks
					setViewedBookmarks(bookmarks);
				}
				// if current viewed collection is unsorted collection
				else if(viewedCollection._id === unsortedCollection._id) {
					// adding updated bookmarks in viewed bookmarks
					setViewedBookmarks(prevState => ([...updatedBookmarks, ...prevState]));
				}
				
				// resolving with count of bookmarks that are moved to Unsorted collection
				resolve(updatedBookmarks.length);
			})
			.catch(err => {
				console.error(err)
				reject(err?.response?.data)
			});
	});


	// deleting all empty collections depending on group id
	const deleteEmptyCollections = (data) => new Promise((resolve, reject) => {
		// retrieving group id from query data
		const { groupId } = data;
		
		// counting empty collections of group
		const emptyCollectionsCount = collections.filter(collection => (
			collection.groupId === groupId && collection.bookmarksCount === 0
		)).length;

		// if no empty collections found
		if(emptyCollectionsCount === 0) {
			reject({
				message: 'All collections in the group have at least 1 bookmark, thus nothing to delete.'
			});
		}
		else {
			CollectionService.deleteEmptyCollections(data)
			.then(res => {
				// removing empty collections from state
				setCollections(prevState => prevState.filter(collection => (
					collection.groupId !== groupId || collection.bookmarksCount > 0
				)));
				// resolving with deleted collections count
				resolve(res.data.deletedCount);
			})
			.catch(err => reject(err.response.data));
		}
	});

	// updating collection in db with provided data
	const updateCollection = (data) => new Promise((resolve, reject) => {
		CollectionService.updateCollection(data)
			.then(({ data }) => {
				// updating modified collection in collections state
				setCollections(prevState => prevState.map(collection => (
					collection._id === data._id ? data : collection
				)));
				// if modified collection was view collection than update viewed collection state
				if(viewedCollection._id === data._id) {
					setViewedCollection(data);
				}
				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});

	// updating collection groupId in db
	const updateCollectionGroupId = (data, callback) => new Promise((resolve, reject) => {
		CollectionService.updateCollection(data)
			.then(({ data }) => {
				// calling provided callback
				callback()
					.then(() => {
						// updating modified collection in collections state
						setCollections(prevState => [data, ...prevState.filter(group => group._id !== data._id)]);
						
						// if modified collection was view collection than update viewed collection state
						if(viewedCollection._id === data._id) {
							setViewedCollection(data);
						}

						// resolving with success
						resolve();
					})
					.catch(err => reject(err));
			})
			.catch(err => reject(err));
	});


	// bookmarks CRUD:

	// creating bookmark in db and in state
	const createBookmark = (data) => new Promise((resolve, reject) => {
		BookmarkService.createBookmark(data)
			.then(({ data }) => {
				// inserting created bookmark in state
				setBookmarks(prevState => [data, ...prevState]);

				// if viewed colection is the collection created bookmark is associated with
				if(viewedCollection._id === data.collectionId) {
					setViewedBookmarks(prevState => [data, ...prevState]);
				}
				
				// updating bookmarks count of bookmark collection
				setCollections(prevState => prevState.map(collection => (
					collection._id === data.collectionId ? 
						{ ...collection, bookmarksCount: collection.bookmarksCount + 1 } : 
						collection
				)));

				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// updating bookmark in db and in state
	const updateBookmark = (data) => new Promise((resolve, reject) => {
		// finding previous collection id 
		const { collectionId: prevCollectionId } = bookmarks.find(bookmark => bookmark._id === data.bookmarkId);

		BookmarkService.updateBookmark(data)
			.then(({ data }) => {
				// updating bookmark in bookmarks state
				setBookmarks(prevState => (
					prevState.map(bookmark => (bookmark._id === data._id ? data : bookmark))
				));

				// current colection id
				const { collectionId: currentCollectionId } = data;

				// if colection id was not changed
				if(prevCollectionId === currentCollectionId) {
					// updating bookmark in viewed bookmarks state
					setViewedBookmarks(prevState => (
						prevState.map(bookmark => bookmark._id === data._id ? data : bookmark
					)));
				}
				// if collection id has been changed
				else {
					// if current viewed collection is not all bookmarks collection
					if(viewedCollection._id !== allBookmarksCollection._id) {
						// deleting updated bookmark from viewed bookmarks
						setViewedBookmarks(prevState => prevState.filter(bookmark => bookmark._id !== data._id));
					}
					// if viewed collection is all bookmarks collection
					else {
						// updating data inside viewed bookmarks
						setViewedBookmarks(prevState => prevState.map(bookmark => (
							bookmark._id === data._id ? data : bookmark
						)));
					}

					// updating bookmarks count of both collections
					setCollections(prevState => prevState.map(collection => {			
						switch(collection._id) {
							case currentCollectionId:
								return ({ ...collection, bookmarksCount: collection.bookmarksCount + 1 });
							case prevCollectionId:
								return ({ ...collection, bookmarksCount: collection.bookmarksCount - 1 });
							default:
								return collection;
						}
					}));
				}

				// resolving with success
				resolve();
			})
			.catch(err => reject(err?.response?.data));
	});


	// deleting bookmark from db and state
	const deleteBookmark = (data) => new Promise((resolve, reject) => {
		BookmarkService.deleteBookmark(data)
			.then(({ data }) => {
				// retrieving bookmark data
				const { _id: bookmarkId, collectionId } = data;

				// deleting bookmark from state
				setBookmarks(prevState => prevState.filter(bookmark => bookmark._id !== bookmarkId));
				
				// changing bookmarks count of collection if bookmark had collectionId
				if(collectionId) {
					setCollections(prevState => prevState.map(collection => (
						collection._id === collectionId ? 
							{ ...collection, bookmarksCount: collection.bookmarksCount - 1 } :
							collection
					)));
				}

				// updating viewed bookmarks
				setViewedBookmarks(prevState => prevState.filter(bookmark => bookmark._id !== bookmarkId));

				// resolving with success
				resolve();
			})
			.catch(err => reject(err.response.data));
	});


	// context value
	const contextValue = {
		groups, 
		collections,
		bookmarks,

		viewedBookmarks,
		viewedCollection,
		searchValue,

		setViewedCollectionAndBookmarks,
		onSearch,

		// groups CRUD
		createGroup,
		deleteGroup,
		updateGroup,

		// collection CRUD
		createCollection,
		deleteCollection,
		deleteEmptyCollections,
		updateCollection,
		updateCollectionGroupId,

		// bookmarks CRUD
		createBookmark,
		updateBookmark,
		deleteBookmark,
	};

	return <DataContext.Provider value={contextValue}>{ children }</DataContext.Provider>
};


// prop types
const requiredArrayOfObjects = PropTypes.arrayOf(PropTypes.object).isRequired;

DataProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	data: PropTypes.shape({
		groups: requiredArrayOfObjects,
		collections: requiredArrayOfObjects,
		bookmarks: requiredArrayOfObjects,
	}).isRequired,
};


export default DataProvider;