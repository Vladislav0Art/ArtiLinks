const bcrypt = require('bcryptjs');
const Cookies = require('cookies');
// subdocs
const Toolbar = require('../../utils/db/models/subdocs/Toolbar');
const View = require('../../utils/db/models/subdocs/View');
const SortMode = require('../../utils/db/models/subdocs/SortMode');
// utils
const EmailConfirmService = require('../../utils/server-services/EmailConfirmService');
const TokenService = require('../../utils/server-services/TokenService');
const UserDto = require('../../utils/dtos/userDto');
const ApiError = require('../../utils/exceptions/ApiError.js');
const respondWithError = require('../../utils/exceptions/respondWithError');
// models
const User = require('../../utils/db/models/User');
const EmailConfirmation = require('../../utils/db/models/EmailConfirmation');



// returns validation result object
const validatePassedFormData = (data) => {
  const { 
    firstName, 
    lastName, 
    email, 
    password, 
    passwordConfirmation } = data;

    if(!firstName || !lastName || !email || !password || !passwordConfirmation) {
      // validate emptiness of passed data
      throw ApiError.BadRequest('All fields must be filled');
    }
    else if(password.length < 5) {
      // validate length of provided password
      throw ApiError.BadRequest('Password must contain at least 5 characters');
    }
    else if(password !== passwordConfirmation) {
      // validate both passwords equivalence
      throw ApiError.BadRequest('Passwords do not match');
    }

};

// returns true if user exists, otherwise returns false
const checkUserExistenceInDB = async (email) => {
  const user = await User.findOne({ "data.email": email }).exec();
  return Boolean(user);
};


// retruns hashed password
const hashPassword = (plainPassword) => {
  let hashedPassword;
  
  try {
    hashedPassword = bcrypt.hashSync(plainPassword, 10);
  }
  catch(err) {
    throw err;
  }

  return hashedPassword;
};


// creates new User mongoose model instance with subdocs
const createNewUser = ({
  firstName,
  lastName,
  email,
  hashedPassword
}) => {
  const userData = {
    firstName,
    lastName,
    email,
    password: hashedPassword
  };

  const newUserInstance = new User({
    data: userData,
    toolbar: Toolbar,
    view: View,
    sortMode: SortMode
  });

  return newUserInstance;
};


// @route:  POST /api/register
// @descr:  registers new user and saves it in db 
// @access: Public
const registerUser = async (req, res) => {
  try {
    // validating fields
    validatePassedFormData(req.body);

    const { 
      firstName, 
      lastName, 
      email, 
      password
    } = req.body;

    // checking whether user with passed email exists
    const doesUserExist = await checkUserExistenceInDB(email);
    
    // user exists
    if(doesUserExist) {
      throw ApiError.BadRequest('User with the passed email already exists');
    }

    // generate hashed password
    const hashedPassword = hashPassword(password);

    // creates and saves user in db 
    const user = await createNewUser({
      firstName,
      lastName,
      email,
      hashedPassword
    }).save();

    // creating user data transfer object (dto)
    const userDto = new UserDto(user);

    // deleting previous confirmation email
    await EmailConfirmation.deleteOne({ userId: userDto.id });

    // saving email confirmation instance with user id in db
    const { uid } = await EmailConfirmService.createEmailConfirmationInstance(userDto.id);
    // sending email with nodemailer with confirmation
    await EmailConfirmService.sendConfirmationEmail({
      uid,
      userEmail: userDto.data.email,
      host: req.headers.host
    });

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


module.exports = registerUser;