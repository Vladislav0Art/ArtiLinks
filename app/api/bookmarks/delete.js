// models
const Bookmark = require('../../utils/db/models/datadocs/Bookmark');
// services
const BookmarkService = require('../../utils/server-services/BookmarkService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');




// deleting bookmark from db by id
const deleteBookmark = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const { bookmarkId } = req.body;

	// if bookmark id is not provided
	if(!bookmarkId) {
		return respondWithError(ApiError.BadRequest('Bookmark id is not provided'), res);
	}

	try {
		// if bookmark with provided id does not exist
		if(!(await BookmarkService.exists({ _id: bookmarkId, userId: user.id }))) {
			throw ApiError.BadRequest('Bookmark with provided id does not exist');
		}

		// deleting collection by id in db (decrementing bookmarks count of associated collection)
		const deletedBookmark = await BookmarkService.deleteBookmarkById(bookmarkId);
		res.json(deletedBookmark);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = deleteBookmark;