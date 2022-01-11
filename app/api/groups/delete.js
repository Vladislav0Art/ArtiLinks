// models
const Group = require('../../utils/db/models/datadocs/Group');
// services
const GroupService = require('../../utils/server-services/GroupService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');


// deleting group from db
const deleteGroup = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const { groupId } = req.body;

	// if group id is not provided
	if(!groupId) {
		return respondWithError(ApiError.BadRequest('Unable to perform deletion because group id is not provided'), res);
	}

	try {
		// checking whether group exists or not
		const groupExists = await Group.exists({ _id: groupId });
		
		// if group with provided id does not exist
		if(!groupExists) {
			throw ApiError.BadRequest('Group with provided id does not exist');
		}

		// deleting group in db
		// the deletion also deletes collections associated with the group and bookmarks of each collection
		const deletedGroup = await GroupService.deleteGroupById(groupId);

		// responding with deleted object
		res.json(deletedGroup);
	}
	catch(err) {
		respondWithError(err, res)
	}
};



module.exports = deleteGroup;