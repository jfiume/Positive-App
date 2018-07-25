var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_db');

var affirmationSchema = mongoose.Schema({
  body: String
});
var Affirmation = mongoose.model("Affirmation", affirmationSchema);

module.exports = Affirmation;
