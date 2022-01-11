const db = require('../../../app/utils/db/database');
// middleware
const runMiddleware = require('../../../app/middleware/runMiddleware');
const authMiddleware = require('../../../app/middleware/authMiddleware');
// api
const createCollection = require('../../../app/api/collections/create');
// utils
const ApiError = require('../../../app/utils/exceptions/ApiError');
const respondWithError = require('../../../app/utils/exceptions/respondWithError');


// @route:  POST /api/collections/create
// @descr:  creates new collection
// @access: Private
export default async function handler(req, res) {
	// if request method is not POST
	if(req.method !== "POST") {
		const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
		return respondWithError(err, res);
	}

	try {
		// connecting to db
		await db.connectToDb();
		// checking authorization
		await runMiddleware(req, res, authMiddleware);
		// creating collection
		createCollection(req, res);
	}
	catch(err) {
		respondWithError(err, res);
	}
}