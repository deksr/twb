var mongoose = require('mongoose');
var schema = mongoose.Schema({
  postname: String
});

var Post = mongoose.model('posts', schema);
module.exports = Post;