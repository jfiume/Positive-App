var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var affirmationSchema = mongoose.Schema({
  body: String
});
var Affirmation = mongoose.model("Affirmation", affirmationSchema);

module.exports = Affirmation;
