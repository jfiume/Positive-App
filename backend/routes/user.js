var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

const users = [
  { name: 'Scott' },
  { name: 'Sabrina' },
  { name: 'Dan' },
];

// Seed the database from the above users
router.get('/seed', function(req, res) {
  User.find(function(err, response) {
    for (let j in response) {
      response[j].remove();
    }
  });
  for (let i in users) {
    let newUser = new User({
      name: users[i].name
    });
    newUser.save();
  }
  res.json("database seeded");
});

//Add a new user
router.post('/', function(req, res) {
  const userInfo = req.body;
  if(!userInfo){
    res.status(400)
    res.json({message: "Bad Request"});
  } else {
    let newUser = new User({
      name: req.body.name
    });

    newUser.save(function(err, User) {
      if(err){
        res.json({message: "Database error"});
      } else {
        res.json({message: "New user added"});
      }
    });
  }
});

//Edit a user
router.put('/:id', function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
    if(err) {
      res.json({message: `Error in updating user with id ${req.params.id}`});
    } else {
      res.json(response);
    }
  });
});

//Get all users
router.get('/', function(req, res) {
  User.find(function(err, response) {
    res.json(response);
  });
});

//Get a specific user
router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, response) {
    if(err) {
      res.json({message: `Error cannot find user with id ${req.params.id}`});
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
