const mongoose = require('mongoose');

const SortModeSchema = new mongoose.Schema({
  sortByDate: {
    type: Boolean,
    default: true
  },
  sortByName: {
    type: Boolean,
    default: false
  },
  isAscendingOrder: {
    type: Boolean,
    default: true
  }
});

module.exports = SortModeSchema;