var express = require('express');
var router = express.Router();
var Affirmation = require('../models/affirmation.js');
var affirmations = require('../seeds/affirmation_seeds.js');

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
  Affirmation.find(function(err, response) {
    res.json(response);
  });
});


module.exports = router;
