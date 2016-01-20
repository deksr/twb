var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
  res.render('items/index');
});


// for getting data
router.get('/blooms', function(req, res) {
  Item.find({}).exec(function(err, items) {
    // console.log("data from the db")
    // console.log(items)
    res.json(items);
  });
});


// for posting data
router.post('/blooms', function(req, res) {
  console.log(req.body);
	Item.create(req.body, function(err, item) {
      // console.log("from post the data")
	    // console.log(item);   
	    res.json(item)
  });
});


// for deleting data
router.delete('/blooms/:id', function(req, res) {
	// var id = req.params.id
 //  console.log(id);
   // console.log(req.params.id);
  Item.findByIdAndRemove(req.params.id, function(err, doc){
  	// console.log(doc);
  	res.json(doc)
  })
});



// for editing and updating data
router.get('/blooms/:id', function(req, res) {
  // console.log(req.params.id);
  Item.findById(req.params.id, function(err, item){
  // console.log(item)
  res.json(item)
  })
});

router.put('/blooms/:id', function(req, res) {
  console.log("update please")
  // console.log(req.params.id);
  // console.log(req.body.body);
  // console.log(req.body.tagline);
  Item.findById(req.params.id, function(err, item) {
    item.body = req.body.body;
    item.tagline = req.body.tagline;
    item.save(function(err) {
      if (err){
        console.log(err);
      } 
      else {
        res.json(item)
      }
    })
  })

});




module.exports = router;

