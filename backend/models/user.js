var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db');

var userSchema = mongoose.Schema({
  name: String
});
var User = mongoose.model("User", userSchema);

module.exports = User;
