// services
const BookmarkService = require('../../utils/server-services/BookmarkService');
const CollectionService = require('../../utils/server-services/CollectionService');
// exceptions
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');


// creating bookmark in db
const createBookmark = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const userId = user.id;
	const { collectionId, link } = req.body;

	// if required fields are not provided
	if(!collectionId || !link) {
		return respondWithError(ApiError.BadRequest('Required fields are not provided'), res);
	}

	try {
		// checking if collection with provided id exists in user account
		const collectionExists = await CollectionService.exists({ _id: collectionId, userId });
		// if collection does not exist in user account
		if(!collectionExists) {
			throw ApiError.BadRequest('Collection with provided id does not exist');
		}

		// requesting og data from the resource
		const data = await BookmarkService.extractOpenGraphDataFromResource(link);

		// creating new bookmark in db (it increments bookmarks count in the associated collection)
		const bookmark = await BookmarkService.createNewBookmarkInDb({
			userId, collectionId, data
		});

		// updating count of bookmarks
		res.json(bookmark);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = createBookmark;