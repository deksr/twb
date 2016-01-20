var mongoose = require('mongoose');
var schema = mongoose.Schema({
  body: String,
  tagline: String,
  date: { type: Date, default: Date.now }
});

var Item = mongoose.model('items', schema);
module.exports = Item;
