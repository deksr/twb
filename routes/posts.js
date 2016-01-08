var express = require('express');
var router = express.Router();
var path    = require("path");
var Post = require('../models/posts');


router.get('/', function(req, res) {
  Post.find({}).exec(function(err, posts) {
      res.render('posts/index', {posts: posts});
      //below code works if you are sending through sendfile
       // res.sendFile('/views/posts/index.html', {posts: posts}); 
  });
});


// for posting data
router.post('/jupiter', function(req, res) {
  // console.log(req.body);
  Post.create(req.body, function(err, post) {
      // console.log(post)
      res.json(post)
  });
});



module.exports = router;
