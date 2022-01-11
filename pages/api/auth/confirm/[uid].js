const db = require("../../../../app/utils/db/database");
// api
const confirmEmail = require('../../../../app/api/auth/confirm');
// utils
const ApiError = require("../../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../../app/utils/exceptions/respondWithError');


// @route:  GET /api/confirm/[uid]
// @descr:  confirms email of user in db 
// @access: Public
export default function handler(req, res) {
  if(req.method !== "GET") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  db.connectToDb()
    // confirming email
    .then(() => confirmEmail(req, res))
    .catch(err => respondWithError(err, res));
};
