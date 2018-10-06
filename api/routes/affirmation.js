var express = require('express');
var router = express.Router();
var Affirmation = require('../models/affirmation.js');

const affirmations = [
  { body: "Today is a good day" },
  { body: "You are the perfect you" },
  { body: "You are great!" },
  { body: "You are love. You have purpose. You were made with divine intention." },
  { body: "You can and you will" },
  { body: "You are a superhero" },
  { body: "You don't need to compare yourself to others" },
  { body: "You are enough" },
  { body: "You are the whole package" },
  { body: "You have the power to create change" },
  { body: "You can do all the things" },
  { body: "You deserve the best" },
  { body: "You make me so proud" },
  { body: "Your presence is power" },
  { body: "When you really want it, you are unstoppable" },
  { body: "Every decision you make is the right one for you" },
  { body: "You speak with loving words" },
  { body: "Your strength is greater than any struggle" },
  { body: "Your are fearless" },
  { body: "You are getting stronger every day" },
  { body: "You can do this!" },
  { body: "You were not made to give up" },
  { body: "No one can make you feel inferior" },
  { body: "You are worthy" },
  { body: "You inspire others" },
  { body: "You are brave enough to climb any mountain" },
  { body: "You have the courage to say 'NO'" },
  { body: "The success of others will not make you jealous. Your time will come." },
  { body: "The only person who can defeat you is yourself." },
  { body: "Everything will work out for you." },
  { body: "You dare to be different" },
  { body: "Your confidence knows no limits" },
  { body: "You are a beautiful person" },
  { body: "You deserve love, compassion and empathy" },
  { body: "There is no wrong decision" },
  { body: "You matter. You are allowed to say 'NO' to others and 'YES' to yourself" },
  { body: "You are a magnet for love" },
  { body: "You will achieve all of your goals" },
  { body: "You are focused, persistant and will never quit" },
  { body: "Success is in your future." },
  { body: "You move beyond stress to peace" },
  { body: "Today your thoughts are positive and full of joy" },
  { body: "You are unique and a gift to the world" },
  { body: "You are creating the career of your dreams" },
  { body: "There are no limits to what you can achieve" },
  { body: "Positive energy surrounds you" },
  { body: "Your career will be the one of your dreams" },
  { body: "When opportunity knocks you will be prepared to answer the door" },
  { body: "You have all the power you need to create the success you desire" },
  { body: "Success is not final, failure is not fatal: it is the courage to continue that counts." },
];

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
