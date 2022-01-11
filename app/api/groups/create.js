// services
const GroupService = require('../../utils/server-services/GroupService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');



// creating new group for user
const createGroup = (req, res) => {
	const user = req.user;

	// if user is not defined return unauthorized error
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	// retrieving group label
	const groupLabel = req.body.label;

	// if group label is not provided return bad request error
	if(!groupLabel) {
		return respondWithError(ApiError.BadRequest('Group label is required. Please, type the group label.'), res);
	}

	// creating and saving new group in db
	GroupService.createNewGroupInDb(groupLabel, user.id)
		.then(group => res.json(group))
		.catch(err => respondWithError(err, res));
};


module.exports = createGroup;