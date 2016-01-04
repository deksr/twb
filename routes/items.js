var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
	console.log("got a GET")
  res.render('items/index');
});


router.get('/blooms', function(req, res) {
  Item.find({}).exec(function(err, items) {
    res.json(items);
  });
});

router.post('/blooms', function(req, res) {
  console.log(req.body);

	Item.create(req.body, function(err, item) {
	    // res.render('items/index', {posts: posts})
	    console.log("back from db")
	    console.log(item)
	    res.json(item)
  });

});

module.exports = router;










