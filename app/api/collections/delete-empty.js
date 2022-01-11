// models
const Group = require('../../utils/db/models/datadocs/Group');
// services
const CollectionService = require('../../utils/server-services/CollectionService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');



// deleting empty collections by group id
const deleteEmptyCollectionsInGroup = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const { groupId } = req.body;

	// if group id is not provided
	if(!groupId) {
		return respondWithError(ApiError.BadRequest('Group id is not provided'), res);
	}

	try {
		// if group with provided id does not exist in user account 
		if(!(await Group.exists({ _id: groupId, userId: user.id }))) {
			throw ApiError.BadRequest('Group with provided id does not exist');
		}

		// deleting empty collections by group id
		const deletedCount = await CollectionService.deleteEmptyCollectionsByGroupId(groupId);
		res.json(deletedCount);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = deleteEmptyCollectionsInGroup;