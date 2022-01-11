const db = require("../../../../app/utils/db/database");
// api
const sendPasswordRecoveryEmailToUser = require('../../../../app/api/auth/send-recovery-email');
// utils
const ApiError = require("../../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../../app/utils/exceptions/respondWithError');


// @route:  POST /api/recovery
// @descr:  sending recovey email to user's email
// @access: Public
export default function handler(req, res) {
  if(req.method !== "POST") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  db.connectToDb()
    // sending recovery email to user's email 
    .then(() => sendPasswordRecoveryEmailToUser(req, res))
    .catch(err => respondWithError(err, res));
};
