var express = require('express');
var router = express.Router();
var Affirmation = require('../models/affirmation.js');
var db = require('../index.js');

const affirmations = [
  { body: "Today is a good day" },
  { body: "You are the perfect you" },
  { body: "You are great!" }
];

// Getting all to generate the random affirmation
router.get('/random', function(req, res) {
  const random = Math.floor(Math.random()*affirmations.length);
  Affirmation.find(function(err, response) {
    if (err){
      res.json({message: "Database error"});
    } else {
      res.json(response);
    }
  });
});

// Seed the database from the above affirmations
router.get('/seed', function(req, res) {
  Affirmation.find(function(err, response) {
    for (let j in response) {
      response[j].remove();
    }
  });
  for (let i in affirmations) {
    let newAffirm = new Affirmation({
      body: affirmations[i].body
    });
    newAffirm.save();
  }
  res.json("database seeded");
});

// Get all affirmations
router.get('/', function(req, res) {
  db.Affirmation.find(function(err, response) {
    res.json(response);
  });
});


module.exports = router;
