const Cookies = require('cookies');
// utils
const respondWithError = require('../../utils/exceptions/respondWithError');
const TokenService = require('../../utils/server-services/TokenService');



// deletes token from db and returns it
const logout = async (refreshToken) => {
  const token = await TokenService.removeRefreshToken(refreshToken);
  return token;
};


// logs out user, deletes refresh token from cookies
const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logout(refreshToken);

    // deleting refresh token cookie using set method with no value passed
    const cookies = new Cookies(req, res);
    cookies.set('refreshToken');

    res.json(token);
  }
  catch(err) {
    respondWithError(err, res);
  }
};

module.exports = logoutUser;