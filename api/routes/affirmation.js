var express = require('express');
var router = express.Router();
var Affirmation = require('../models/affirmation.js');
var AffirmationPro = require('../models/affirmation_pro.js');
var affirmations = require('../seeds/affirmation_seeds.js');
var affirmationsPro;

// Seed the database from the above affirmations
router.get('/seed', function(req, res) {
  Affirmation.find(function(err, response) {
    for (let j in response) {
      response[j].remove();
    }
  });
  // Professional mode
  AffirmationPro.find(function(err, response) {
    for (let j in response) {
      response[j].remove();
    }
  });
  // Average Joe mode
  for (let i in affirmations) {
    let newAffirm = new Affirmation({
      body: affirmations[i].body
    });
    newAffirm.save();
  }
  res.json("database seeded");
  // Professional mode
  for (let i in affirmationsPro) {
    let newAffirmPro = new Affirmation({
      body: affirmationsPro[i].body
    });
    newAffirmPro.save();
  }
  res.json("database seeded");
});

// Get all affirmations
router.get('/', function(req, res) {
  Affirmation.find(function(err, response) {
    res.json(response);
  });
});

// Get the pro style affirmations
router.get('/pro', function(req, res) {
  AffirmationPro.find(function(err, response) {
    res.json(response);
  });
});

module.exports = router;
