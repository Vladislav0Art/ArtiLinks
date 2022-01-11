// models
const Group = require('../../utils/db/models/datadocs/Group');
// services
const CollectionService = require('../../utils/server-services/CollectionService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');


// creating new collection and saving it in db
const createCollection = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const { groupId, label, icon = '' } = req.body;

	// if some required data is not provided
	if(!groupId || !label) {
		return respondWithError(ApiError.BadRequest('Required fields are not provided'), res);
	}

	try {
		const userId = user.id;

		// checking group existance associated with the user
		const groupExists = await Group.exists({ _id: groupId, userId });

		// if group does not exist
		if(!groupExists) {
			throw ApiError.BadRequest('Group with provided id does not exist');
		}

		// saving collection to db
		const collection = await CollectionService.createNewCollectionInDb({
			userId, groupId, label, icon
		});

		res.json(collection);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = createCollection;