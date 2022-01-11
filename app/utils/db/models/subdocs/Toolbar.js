const mongoose = require('mongoose');

const ToolbarSchema = new mongoose.Schema({
  width: {
    type: Number,
    default: 320
  },
  isOpened: {
    type: Boolean,
    default: true
  }
});

module.exports = ToolbarSchema;