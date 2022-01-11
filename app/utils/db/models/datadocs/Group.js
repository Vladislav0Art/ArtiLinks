const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const GroupSchema = new mongoose.Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true
	},
	label: {
		type: String,
		required: true,
	},
	isVisible: {
		type: Boolean,
		default: true,
	},
}, { timestamps: true });


module.exports = mongoose?.models?.Group || mongoose.model('Group', GroupSchema);