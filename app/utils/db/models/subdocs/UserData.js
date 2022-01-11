const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true
};

const UserDataSchema = new mongoose.Schema({
  email: {
    ...requiredString,
    unique: true
  },
  firstName: requiredString,
  lastName: requiredString,
  password: requiredString,
  avatar: {
    type: String,
    required: false,
    default: ""
  }
});

module.exports = UserDataSchema;