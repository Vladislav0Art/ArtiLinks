// models
const Group = require('../../utils/db/models/datadocs/Group');
// services
const GroupService = require('../../utils/server-services/GroupService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');



// updating any fields of group in db (fields: isVisible, label)
const updateGroup = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	// retrieving data from request body
	const {
		isVisible, 
		label, 
		groupId
	} = req.body;

	// if all avaliable fields are empty
	if(isVisible === undefined && !label) {
		return respondWithError(ApiError.BadRequest('Cannot update with empty fields'), res);
	}

	// if null value is provided
	if(label === null) {
		return respondWithError(ApiError.BadRequest('Group label must not be empty'), res);
	}

	// if group id was not provided
	if(!groupId) {
		return respondWithError(ApiError.BadRequest('Group id is not provided'), res);
	}

	try {
		// checking whether group with provided id exists
		const groupExists = await Group.exists({ _id: groupId });

		// if group does not exist
		if(!groupExists) {
			throw ApiError.BadRequest('Group with provided id does not exist');
		}

		// updating group's fields
		const updatedGroup = await GroupService.updateGroupById(groupId, { isVisible, label });

		// responding with group object
		res.json(updatedGroup);
	}
	catch(err) {
		respondWithError(err, res);
	}
};

module.exports = updateGroup;