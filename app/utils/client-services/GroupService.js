import $api from "../../http";
// utils/routes
import {
	GROUP_CREATE_URL,
	GROUP_UPDATE_URL,
	GROUP_DELETE_URL,
} from '../routes/api';



class GroupService {
	
	// creating group in db
	static createGroup = async ({ label }) => {
		return $api.post(GROUP_CREATE_URL, { label });
	};


	// updating group in db
	static updateGroup = async (data) => {
		return $api.put(GROUP_UPDATE_URL, data);
	};


	// deleting group from db with provided groupId in data param 
	static deleteGroup = async (data) => {
		return $api.delete(GROUP_DELETE_URL, { data });
	}; 

};


export default GroupService;