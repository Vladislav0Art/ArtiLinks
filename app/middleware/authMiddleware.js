// utils
const ApiError = require('../utils/exceptions/ApiError');
const TokenService = require('../utils/server-services/TokenService');


const authMiddleware = (req, res) => new Promise((resolve, reject) => {
  const authorizationHeader = req.headers.authorization;

  // access token is not provided
  if(!authorizationHeader) {
    return reject(ApiError.UnauthorizedError());
  }

  // retrieving access token from header
  const accessToken = authorizationHeader.split(' ')[1]; // ['Bearer', 'access_token']

  if(!accessToken) {
    // access token is not provided
    return reject(ApiError.UnauthorizedError());
  }

  // validating access token
  const userData = TokenService.validateAccessToken(accessToken);
  
  if(!userData) {
    // access token is invalid
    return reject(ApiError.UnauthorizedError());
  }

  // setting user to req object
  req.user = userData;
  resolve();
});

module.exports = authMiddleware;