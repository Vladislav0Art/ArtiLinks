import $api from "../../http";
// utils/routes
import {
	COLLECTION_CREATE_URL,
	COLLECTION_UPDATE_URL,
	COLLECTION_DELETE_URL,
	COLLECTION_DELETE_EMPTY_URL,
} from '../routes/api';


class CollectionService {

	// creating collection in db
	static createCollection = async (data) => {
		return $api.post(COLLECTION_CREATE_URL, data);
	};

	
	// updating collection in db
	static updateCollection = async (data) => {
		return $api.put(COLLECTION_UPDATE_URL, data);
	};

	// deleting collection in db
	static deleteCollection = async (data) => {
		return $api.delete(COLLECTION_DELETE_URL, { data });
	};

	// deleting empty collections in db by group id
	static deleteEmptyCollections = async (data) => {
		return $api.delete(COLLECTION_DELETE_EMPTY_URL, { data });
	};

};


export default CollectionService;