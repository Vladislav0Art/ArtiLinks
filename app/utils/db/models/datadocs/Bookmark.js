const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;
// subdocs
const BookmarkData = require('../subdocs/BookmarkData');

const BookmarkSchema = new mongoose.Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	collectionId: {
		type: Types.ObjectId,
		ref: 'Collection',
		required: false,
	},
	data: BookmarkData,
}, { timestamps: true });


module.exports = mongoose?.models?.Bookmark || mongoose.model('Bookmark', BookmarkSchema);