const db = require("../../../../app/utils/db/database");
// api
const updateUserPassword = require('../../../../app/api/auth/update-password');
// utils
const ApiError = require("../../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../../app/utils/exceptions/respondWithError');


// @route:  PUT /api/recovery/[uid]
// @descr:  resets user's password in db
// @access: Public
export default function handler(req, res) {
  if(req.method !== "PUT") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  db.connectToDb()
    // updating user's password
    .then(() => updateUserPassword(req, res))
    .catch(err => respondWithError(err, res));
};
