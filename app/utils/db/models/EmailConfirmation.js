const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true
};

const EmailConfirmationSchema = new mongoose.Schema({
  uid: requiredString,
  userId: requiredString
}, { timestamps: true });


module.exports = mongoose?.models?.EmailConfirmation || mongoose.model('EmailConfirmation', EmailConfirmationSchema);