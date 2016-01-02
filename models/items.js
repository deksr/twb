var mongoose = require('mongoose');
var schema = mongoose.Schema({
  body: String
});

var Item = mongoose.model('items', schema);
module.exports = Item;
