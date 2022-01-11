const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true
};

const BookmarkDataSchema = new mongoose.Schema({
	link: requiredString,
	title: requiredString,
	domain: requiredString,
	description: {
		type: String,
		default: '',
	},
	imgSrc: {
		type: String,
		default: '',
	},
	favicon: {
		type: String,
		default: '',
	},
});

module.exports = BookmarkDataSchema;