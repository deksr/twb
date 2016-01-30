var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
  res.render('items/index');
});


router.get('/blooms', function(req, res) {
  Item.find({}).exec(function(err, items) {
    res.json(items);
  });
});


router.post('/blooms', function(req, res) {
	Item.create(req.body, function(err, item) {  
	    res.json(item)
  });
});


router.delete('/blooms/:id', function(req, res) {
  Item.findByIdAndRemove(req.params.id, function(err, doc){
  	res.json(doc)
  })
});



router.get('/blooms/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item){
  res.json(item)
  })
});

router.put('/blooms/:id', function(req, res) {
  console.log("update please")

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



router.get('/search?/', function(req, res) {
  Item.find({genres: new RegExp(req.query.genres, "i")},function(err, items) {
      res.json(items) 
  });
});

module.exports = router;

