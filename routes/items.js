var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
	console.log("get")
  res.render('items/index');
});


router.get('/blooms', function(req, res) {
	console.log("get items")
  Item.find({}).exec(function(err, items) {
    res.json(items);
  });
});



router.post('/blooms', function(req, res) {
	console.log("posting");
  console.log(req.body);
	Item.create(req.body, function(err, item) {
	    console.log("ok done")
	    console.log(item)
	    res.json(item)
  });
});



router.delete('/blooms/:id', function(req, res) {
	console.log("please delete ")
	// var id = req.params.id
 //  console.log(id);
   console.log(req.params.id);
  Item.findByIdAndRemove(req.params.id, function(err, doc){
  	console.log("ok deleted")
  	console.log(doc);
  	res.json(doc)
  })
});


module.exports = router;










