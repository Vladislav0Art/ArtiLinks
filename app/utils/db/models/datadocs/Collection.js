const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;


const CollectionSchema = new mongoose.Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	groupId: {
		type: Types.ObjectId,
		ref: 'Group',
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		default: null,
	},
	bookmarksCount: {
		type: Number,
		default: 0,
		min: 0,
	},
}, { timestamps: true });


module.exports = mongoose?.models?.Collection || mongoose.model('Collection', CollectionSchema);