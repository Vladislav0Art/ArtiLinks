// models
const Group = require('../../utils/db/models/datadocs/Group');
const Collection = require('../../utils/db/models/datadocs/Collection');
// services
const CollectionService = require('../../utils/server-services/CollectionService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');




// updating any fields of collection in db (fields: icon, label, groupId)
const updateCollection = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const {
		collectionId,
		icon,
		label,
		groupId
	} = req.body;

	// if collection id is not provided
	if(!collectionId) {
		return respondWithError(ApiError.BadRequest('Collection id is not provided'), res);
	}

	// if all fields are empty
	if(!(icon || label || groupId)) {
		return respondWithError(ApiError.BadRequest('Cannot update with empty fields'), res);
	}

	try {
		// if collection with provided id does not exist
		if(!(await Collection.exists({ _id: collectionId, userId: user.id }))) {
			throw ApiError.BadRequest('Collection with provided id does not exist');
		}

		// if group id will be updated but group does not exist
		if(groupId && !(await Group.exists({ _id: groupId, userId: user.id }))) {
			throw ApiError.BadRequest('Group with provided id does not exist');
		}

		// updating collection in db
		const updatedCollection = await CollectionService.updateCollectionById(collectionId, {
			icon, label, groupId
		});

		res.json(updatedCollection);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = updateCollection;