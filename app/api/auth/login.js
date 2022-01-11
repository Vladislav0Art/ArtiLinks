const Cookies = require('cookies');
const bcrypt = require('bcryptjs');
// utils
const TokenService = require('../../utils/server-services/TokenService');
const ApiError = require('../../utils/exceptions/ApiError.js');
const UserDto = require('../../utils/dtos/userDto');
const respondWithError = require('../../utils/exceptions/respondWithError');
// models
const User = require('../../utils/db/models/User');



// returns true if user exists, otherwise returns false
const getUser = async (email) => {
  return await User.findOne({ "data.email": email }).exec();
};


// compare passed and user's passwords
const comparePasswords = async (passedPassword, hashedUserPassword) => {
  return await bcrypt.compare(passedPassword, hashedUserPassword);
};


// returns tokens and user data
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if any field is empty 
    if(!email || !password) {
      throw ApiError.BadRequest('All fields must be filled');
    }

    // if user does not exist
    const user = await getUser(email);

    if(!user) {
      throw ApiError.BadRequest('User with passed email does not exist');
    }

    // if passwords differ
    const doPasswordsMatch = await comparePasswords(password, user.data.password);
    if(!doPasswordsMatch) {
      throw ApiError.BadRequest('Incorrect password');
    }


    // retrieving user dto
    const userDto = new UserDto(user);

    // creating tokens payload
    const payload = TokenService.createTokenPayload(userDto);

    // creating tokens
    const tokens = TokenService.generateTokens(payload);

    // saving refresh token in db
    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);


	// setting refresh token in http-only cookies
    TokenService.setRefreshTokenInHttpOnlyCookies(req, res, tokens.refreshToken);

    res.status(200).json({
      ...tokens,
      user: { ...userDto }
    });

  }
  catch(err) {
    respondWithError(err, res);
  }
};



module.exports = loginUser;