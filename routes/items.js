var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
	console.log("got a GET")
Item.find({}).exec(function(err, items) {
    // res.render('items/index', {items: items});

    // checking if this works below and it does.
    res.json({items: items});
});
});



module.exports = router;
