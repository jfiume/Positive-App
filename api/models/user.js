var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_db');

var userSchema = mongoose.Schema({
  name: String
});
var User = mongoose.model("User", userSchema);

module.exports = User;

User.find(function(err, response) {
  for (let j in response) {
    response[j].remove();
  }
});


const users = [
  { name: 'Superman' },
  { name: 'Batman' },
  { name: 'Wonder Woman' },
];

User.insertMany(users);
