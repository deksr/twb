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
})

// for deleting data
router.delete('/:id', function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
	  res.redirect('/posts');
	})
});


router.get('/doublejax', function(req, res) {
  Post.find({}).exec(function(err, posts) {
      res.json(posts)
      //below code works if you are sending through sendfile
       // res.sendFile('/views/posts/index.html', {posts: posts}); 
  });
});


// forsearch  ***************************

router.get('/search?/', function(req, res) {
  console.log("??")
  console.log(req.query.postname)
  Post.find({postname: new RegExp(req.query.postname, "i")},function(err, posts) {
      res.json(posts) 
  });
});

module.exports = router;
