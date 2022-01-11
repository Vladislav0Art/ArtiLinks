const db = require("../../../app/utils/db/database");
// api
const registerUser = require('../../../app/api/auth/register');
// utils
const ApiError = require("../../../app/utils/exceptions/ApiError");
const respondWithError = require('../../../app/utils/exceptions/respondWithError');



// @route:  POST /api/register
// @descr:  registers new user and saves it in db 
// @access: Public
export default function handler(req, res) {
  // if request method is not POST
  if(req.method !== "POST") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  
  db.connectToDb()
    // register user
    .then(() => registerUser(req, res))
    .catch(err => respondWithError(err, res));
};
