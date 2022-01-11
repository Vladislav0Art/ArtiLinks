const mongoose = require('mongoose');
// subdocs
const UserData = require('./subdocs/UserData');
const Toolbar = require('./subdocs/Toolbar');
const View = require('./subdocs/View');
const SortMode = require('./subdocs/SortMode');


const UserSchema = new mongoose.Schema({
  isEmailConfirmed: {
    type: Boolean,
    default: false
  },
  data: UserData,
  toolbar: Toolbar,
  view: View,
  sortMode: SortMode
}, { timestamps: true });


module.exports = mongoose?.models?.User || mongoose.model('User', UserSchema);