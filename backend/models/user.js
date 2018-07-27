var mongoose = require('mongoose');
var uri = require('../../.gitignore/mongodb_settings.js');
mongoose.connect(uri || 'mongodb://localhost:27017/my_db');

var userSchema = mongoose.Schema({
  name: String
});
var User = mongoose.model("User", userSchema);

module.exports = User;
