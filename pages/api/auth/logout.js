const db = require("../../../app/utils/db/database");
// api
const logoutUser = require('../../../app/api/auth/logout');
// utils
const ApiError = require("../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../app/utils/exceptions/respondWithError');




// @route:  POST /api/logout
// @descr:  logs out user, deletes refresh token from cookies 
// @access: Public
export default function handler(req, res) {
	// if request method is not POST
	if(req.method !== "POST") {
		const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
		return  respondWithError(err, res);
	}

  
	db.connectToDb()
		// logout user
		.then(() => logoutUser(req, res))
		.catch(err => respondWithError(err, res));
};
