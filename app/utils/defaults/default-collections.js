// images
import allBookmarksIcon from '/public/svg/dashboard/all-bookmarks-icon.svg';
import unsortedBookmarksIcon from '/public/svg/dashboard/unsorted-bookmarks-icon.svg';

// 'All bookmarks' and 'Unsorted' default collections
module.exports = {
	allBookmarksCollection: {
		_id: '-1',
		icon: allBookmarksIcon.src,
		bookmarksCount: null,
		userId: null,
		groupId: null,
		label: "All bookmarks"
	},
	unsortedCollection: {
		_id: '-2',
		icon: unsortedBookmarksIcon.src,
		bookmarksCount: null,
		userId: null,
		groupId: null,
		label: "Unsorted"
	}
};