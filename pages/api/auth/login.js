const db = require("../../../app/utils/db/database");
// api
const loginUser = require('../../../app/api/auth/login');
// utils
const ApiError = require("../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../app/utils/exceptions/respondWithError');




// @route:  POST /api/login
// @descr:  logs in user 
// @access: Public
export default function handler(req, res) {
  // if request method is not POST
  if(req.method !== "POST") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  
  db.connectToDb()
    // login user
    .then(() => loginUser(req, res))
    .catch(err => respondWithError(err, res));
};
