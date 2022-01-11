const db = require("../../app/utils/db/database");
// middleware
const runMiddleware = require('../../app/middleware/runMiddleware');
const authMiddleware = require('../../app/middleware/authMiddleware');
// utils
const ApiError = require("../../app/utils/exceptions/ApiError");
const respondWithError = require('../../app/utils/exceptions/respondWithError');


// @route:  GET /api/dashboard
// @descr:  testing how private routes work
// @access: Private
export default async function handler(req, res) {
  // if request method is not POST
  if(req.method !== "GET") {
    const err = ApiError.BadRequest(`Method '${req.method}' is not supported on this API route`);
    return  respondWithError(err, res);
  }

  try {
    // checking authorization
    await runMiddleware(req, res, authMiddleware);
    res.json(req.user);
  }
  catch(err) {
    respondWithError(err, res);
  }
};
