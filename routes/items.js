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


module.exports = router;










