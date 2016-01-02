var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
Item.find({}).exec(function(err, items) {
    res.render('items/index', {items: items});
});
});

module.exports = router;
