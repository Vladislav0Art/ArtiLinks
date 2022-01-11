import { createContext } from "react";

// data (groups, collections, bookmarks) context
const DataContext = createContext({
	groups: null,
	collections: null,
	bookmarks: null,
	isLoadingData: null,

	viewedBookmarks: null,
	viewedCollection: null,
	searchValue: null,

	setViewedCollectionAndBookmarks: () => {},
	onSearch: () => {},

	// groups CRUD
	createGroup: () => {},
	deleteGroup: () => {},
	updateGroup: () => {},

	// collections CRUD
	createCollection: () => {},
	deleteCollection: () => {},
	deleteEmptyCollections: () => {},
	updateCollection: () => {},
	updateCollectionGroupId: () => {},

	// bookmarks CRUD:
	createBookmark: () => {},
	updateBookmark: () => {},
	deleteBookmark: () => {},
});

export default DataContext;