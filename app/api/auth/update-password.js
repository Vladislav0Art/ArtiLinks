const bcrypt = require('bcryptjs');
// utils
const ApiError = require('../../utils/exceptions/ApiError.js');
const respondWithError = require('../../utils/exceptions/respondWithError');
// models
const User = require('../../utils/db/models/User');
const PasswordRecovery = require('../../utils/db/models/PasswordRecovery');



const validatePasswords = (password, passwordConfirmation) => {
  // if some data was not provided
  if(!password || !passwordConfirmation) {
    throw ApiError.BadRequest('All fields must be filled');
  }

  // if password is too short
  if(password.length < 5) {
    throw ApiError.BadRequest('Password must contain at least 5 characters');
  }

  // if passwords differ
  if(password !== passwordConfirmation) {
    throw ApiError.BadRequest('Passwords do not match');
  }
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


// updates user password in db
const updateUserPassword = async (req, res) => {
  try {
    const { uid } = req.query;
    const { password, passwordConfirmation } = req.body;

    // validating passwords
    validatePasswords(password, passwordConfirmation);

    // searching for the recovery instance in db
    const recoveryInstance = await PasswordRecovery.findOne({ uid });
    
    // if uid was spoiled
    if(!recoveryInstance) {
      throw ApiError.BadRequest('Invalid request');
    }

    // creating hashed password
    const hashedPassword = hashPassword(password);

    // updating user password
    const { email } = recoveryInstance;
    await User.updateOne({ "data.email": email }, { "data.password": hashedPassword }).exec();

    // deleting recovery instance
    await PasswordRecovery.deleteOne({ uid });

    res.json({
      message: 'Password successfully updated'
    });
  }
  catch(err) {
    respondWithError(err, res);
  }
};


module.exports = updateUserPassword;