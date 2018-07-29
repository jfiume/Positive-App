var mongoose = require('mongoose');
// var uri = require('../../.gitignore/mongodb_settings.js');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_db');

var affirmationSchema = mongoose.Schema({
  body: String
});
var Affirmation = mongoose.model("Affirmation", affirmationSchema);

module.exports = Affirmation;

Affirmation.find(function(err, response) {
  for (let j in response) {
    response[j].remove();
  }
});

const affirmations = [
  { body: "Today is a good day" },
  { body: "You are the perfect you" },
  { body: "You are great!" }
];

Affirmation.insertMany(affirmations);
