// models
const User = require('../../../app/utils/db/models/User');
const EmailConfirmation = require('../../../app/utils/db/models/EmailConfirmation');
// utils
const respondWithError = require('../../utils/exceptions/respondWithError');
// utils/routes
const { LOGIN_PAGE } = require('../../utils/routes/pages');


// @route:  GET /api/confirm/[uid]
// @descr:  confirms email of user in db 
// @access: Public
const confirmEmail = (req, res) => {
	const { uid } = req.query;

	// searching for email confirmation instance
	EmailConfirmation.findOne({ uid })
		// updating user email confirmation status
		.then(({ userId }) => User.updateOne({ _id: userId }, { isEmailConfirmed: true }))
		// deleting email confirmation instance
		.then(() => EmailConfirmation.deleteOne({ uid }))
		// redirecting user to login page
		.then(() => res.redirect(LOGIN_PAGE))
		.catch(err => respondWithError(err, res));
};

module.exports = confirmEmail;