// utils
const ApiError = require('../../utils/exceptions/ApiError.js');
const respondWithError = require('../../utils/exceptions/respondWithError');
const EmailConfirmService = require('../../utils/server-services/EmailConfirmService');
// models
const User = require('../../utils/db/models/User');
const PasswordRecovery = require('../../utils/db/models/PasswordRecovery');

// sends recovery email to the email of user
const sendPasswordRecoveryEmailToUser = async (req, res) => {
  try {
    const { email } = req.body;

    // if email is not passed
    if(!email) {
      throw ApiError.BadRequest('Email is not provided');
    }

    // searching for user in db
    const user = await User.findOne({ "data.email": email }).exec();
    
    // if user with passed email does not exist
    if(!user) {
      throw ApiError.BadRequest('User with provided email does not exist');
    }

    // deleting previously created recovery instance in db
    await PasswordRecovery.deleteOne({ email });

    // creating new instance in db
    const { uid } = await EmailConfirmService.createPasswordRecoveryInstance(email);
    // sending recovery email
    await EmailConfirmService.sendPasswordRecoveryEmail({
      uid,
      userEmail: email,
      host: req.headers.host
    });

    // responding to the request
    res.json({ uid });
  }
  catch(err) {
    respondWithError(err, res);
  }
};


module.exports = sendPasswordRecoveryEmailToUser;