var mongoose = require('mongoose');
var schema = mongoose.Schema({
  body: String,
  tagline: String
});

var Item = mongoose.model('items', schema);
module.exports = Item;
