const db = require("../../../app/utils/db/database");
// api
const refreshTokens = require('../../../app/api/auth/refresh');
// utils
const ApiError = require("../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../app/utils/exceptions/respondWithError');




// @route:  GET /api/refresh
// @descr:  refreshes tokens and returns user data
// @access: Public
export default function handler(req, res) {
  // if request method is not GET
  if(req.method !== "GET") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return respondWithError(err, res);
  }

  
  db.connectToDb()
    .then(() => refreshTokens(req, res))
    .catch(err => respondWithError(err, res));
};
