const db = require('../../../app/utils/db/database');
// middleware
const runMiddleware = require('../../../app/middleware/runMiddleware');
const authMiddleware = require('../../../app/middleware/authMiddleware');
// api
const updateCollection = require('../../../app/api/collections/update');
// utils
const ApiError = require('../../../app/utils/exceptions/ApiError');
const respondWithError = require('../../../app/utils/exceptions/respondWithError');


// @route:  PUT /api/collections/update
// @descr:  updates found by id collection with provided fields
// @access: Private
export default async function handler(req, res) {
	// if request method is not PUT
	if(req.method !== "PUT") {
		const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
		return respondWithError(err, res);
	}

	try {
		// connecting to db
		await db.connectToDb();
		// checking authorization
		await runMiddleware(req, res, authMiddleware);
		// updating collection
		updateCollection(req, res);
	}
	catch(err) {
		respondWithError(err, res);
	}
}