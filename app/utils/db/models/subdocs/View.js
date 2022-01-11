const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
  mode: {
    type: String,
    default: 'list'
  },
  isVisible: {
    icon: {
      type: Boolean,
      default: true
    },
    title: {
      type: Boolean,
      default: true
    },
    description: {
      type: Boolean,
      default: true
    },
    bookmarkInfo: {
      type: Boolean,
      default: true
    }
  }
});

module.exports = ViewSchema;