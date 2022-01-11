const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
// models
const Token = require('../db/models/Token');


class TokenService {
  
  // generates acess and refresh tokens
  static generateTokens = (payload) => {
    // retrieving secret from process.env
    const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

    // creating access and refresh tokens
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: '30m'
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: '30d'
    });

    return {
      accessToken,
      refreshToken
    };
  };

  // saves new refresh token in db and returns generated token
  static saveRefreshToken = async (userId, refreshToken) => {
    // counting tokens
    const tokensCount = await Token.countDocuments({ user: userId });
    
    // removing tokens from db, if there are more than 3 tokens
    if(tokensCount >= 3) {
      // deleting user tokens
      await Token.deleteMany({ user: userId });
    }

    // saving token in db
    const newRefreshToken = await Token.create({
      user: userId,
      refreshToken
    });

    return newRefreshToken;
  };

  // deletes refresh token from db and returns deleted token
  static removeRefreshToken = async (refreshToken) => {
    const tokenData = await Token.findOne({ refreshToken });
    await Token.deleteOne({ refreshToken });
    
    return tokenData;
  };

  // validates access token
  static validateAccessToken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    }
    catch {
      return null;
    }
  };

  // validates refresh token
  static validateRefreshToken = (token) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return payload;
    }
    catch {
      return null;
    }
  };

  // finds token in db
  static findToken = async (refreshToken) => {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  };


  // checks whether refresh token exists in db
  static refreshTokenExists = async (refreshToken) => await Token.exists({ refreshToken });


  static setRefreshTokenInHttpOnlyCookies = (req, res, refreshToken) => {
		// setting refresh token in http-only cookies
		const cookies = new Cookies(req, res);
		cookies.set('refreshToken', refreshToken, {
			httpOnly: true,
			// secure: true, // this option is used with HTTPS protocol
			maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
		});
  };
  
  // returns payload for tokens
  static createTokenPayload = (userDto) => {
    const payload = {
      id: userDto.id,
      email: userDto.data.email,
      isEmailConfirmed: userDto.isEmailConfirmed
    };

    return payload;
  };

};


module.exports = TokenService;