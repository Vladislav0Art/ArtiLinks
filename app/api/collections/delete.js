// models
const Collection = require('../../utils/db/models/datadocs/Collection');
// services
const CollectionService = require('../../utils/server-services/CollectionService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');




// deleting collection from db by id
const deleteCollection = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const { collectionId } = req.body;

	// if collection id is not provided
	if(!collectionId) {
		return respondWithError(ApiError.BadRequest('Collection id is not provided'), res);
	}

	try {
		// if collection with provided id does not exist
		if(!(await Collection.exists({ _id: collectionId }))) {
			throw ApiError.BadRequest('Collection with provided id does not exist');
		}

		// deleting collection by id in db
		const deletedCollection = await CollectionService.deleteCollectionById(collectionId);
		res.json(deletedCollection);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = deleteCollection;