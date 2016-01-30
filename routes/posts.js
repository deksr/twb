var express = require('express');
var router = express.Router();
var path    = require("path");
var Post = require('../models/posts');


router.get('/', function(req, res) {
  Post.find({}).exec(function(err, posts) {
      res.render('posts/index', {posts: posts});
  });
});




router.post('/jupiter', function(req, res) {
 Post.create(req.body, function(err, post) {
res.json(post)
});
})

router.delete('/:id', function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
	  res.redirect('/posts');
	})
});


router.get('/doublejax', function(req, res) {
  Post.find({}).exec(function(err, posts) {
      res.json(posts)
  });
});



router.get('/search?/', function(req, res) {
  Post.find({postname: new RegExp(req.query.postname, "i")},function(err, posts) {
      res.json(posts) 
  });
});

module.exports = router;
