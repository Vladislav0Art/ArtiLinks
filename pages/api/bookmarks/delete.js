const db = require('../../../app/utils/db/database');
// middleware
const runMiddleware = require('../../../app/middleware/runMiddleware');
const authMiddleware = require('../../../app/middleware/authMiddleware');
// api
const deleteBookmark = require('../../../app/api/bookmarks/delete');
// utils
const ApiError = require('../../../app/utils/exceptions/ApiError');
const respondWithError = require('../../../app/utils/exceptions/respondWithError');




// @route:  DELETE /api/bookmark/delete
// @descr:  deletes bookmark by id and decrements bookmarks count of associated collection
// @access: Private
export default async function handler(req, res) {
	// if request method is not POST
	if(req.method !== "DELETE") {
		const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
		return respondWithError(err, res);
	}

	try {
		// connecting to db
		await db.connectToDb();
		// checking authorization
		await runMiddleware(req, res, authMiddleware);
		// deleting collection
		deleteBookmark(req, res);
	}
	catch(err) {
		respondWithError(err, res);
	}
}