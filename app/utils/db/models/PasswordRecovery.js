const mongoose = require('mongoose');

const PasswordRecoverySchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    expires: '1h', 
    default: Date.now
  }
});


module.exports = mongoose?.models?.PasswordRecovery || mongoose.model('PasswordRecovery', PasswordRecoverySchema);