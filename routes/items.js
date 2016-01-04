var express = require('express');
var router = express.Router();
var Item = require('../models/items');

router.get('/', function(req, res) {
	console.log("got a GET")
  res.render('items/index');
});


router.get('/blooms', function(req, res) {
	console.log("got a request for blooms")
var pethotel = [{
		petname: "Dog",
		ownername: "Mary"
	},
	{
    petname: "Cat",
    ownername: "Jane"
	}]
  res.json(pethotel)
   })


module.exports = router;










