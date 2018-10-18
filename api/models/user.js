var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_db');

var userSchema = mongoose.Schema({
  name: String,
  professional: boolean
});
var User = mongoose.model("User", userSchema);

module.exports = User;
