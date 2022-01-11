import $api from "../../http";
// utils/routes
import {
	BOOKMARK_CREATE_URL,
	BOOKMARK_UPDATE_URL,
	BOOKMARK_DELETE_URL,
} from '../routes/api';


class BookmarkService {

	// creating bookmark in db
	static createBookmark = async (data) => {
		return $api.post(BOOKMARK_CREATE_URL, data); 
	};

	// updating bookmark in db
	static updateBookmark = async (data) => {
		return $api.put(BOOKMARK_UPDATE_URL, data);
	};

	// deleting bookmark in db
	static deleteBookmark = async (data) => {
		return $api.delete(BOOKMARK_DELETE_URL, { data });
	};

};


export default BookmarkService;