const Cookies = require('cookies');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');
const TokenService = require('../../utils/server-services/TokenService');
const UserDto = require('../../utils/dtos/userDto');
// models
const User = require('../../utils/db/models/User');



// refreshes token and gets user data
const refresh = async (refreshToken) => {
	if(!refreshToken) {
		throw ApiError.UnauthorizedError();
	}

	const tokenPayload = TokenService.validateRefreshToken(refreshToken);
	const tokenDataFromDb = await TokenService.findToken(refreshToken);

	// if token is invalid or does not exist in db
	if(!tokenPayload || !tokenDataFromDb) {
		throw ApiError.UnauthorizedError();
	}

	// retrieving user from db
	const user = await User.findById(tokenPayload.id);

	// if user does not exist in db
	if(!user) {
		throw ApiError.UnauthorizedError();
	}

	// retrieving user dto
	const userDto = new UserDto(user);

	// creating tokens payload
	const payload = TokenService.createTokenPayload(userDto);

	// generating new tokens
	const tokens = TokenService.generateTokens(payload);

	// saving refresh token in db
	await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
	
	return {
		...tokens,
		user: { ...userDto }
	}
};


// refreshes tokens and returns new tokens and user data 
const refreshTokens = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;

		const response = await refresh(refreshToken);

		// setting refresh token in http-only cookies
		TokenService.setRefreshTokenInHttpOnlyCookies(req, res, response.refreshToken);

		res.json(response);
	}
	catch(err) {
		respondWithError(err, res);
	}
};

module.exports = refreshTokens;