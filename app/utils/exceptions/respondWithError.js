const ApiError = require('./ApiError');

module.exports = (err, response) => {
	let statusCode = 500;
	let errors = [];
	let message = 'Something went wrong'

	// custom error
	if(err instanceof ApiError) {
		statusCode = err.status;
		errors = err.errors;
		message = err.message
	}
  	// error on server side
	else {
		console.error(err);
	}

  	response.status(statusCode).json({ message, errors, error: err });
};