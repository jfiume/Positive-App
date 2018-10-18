var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_db');

var affirmationProSchema = mongoose.Schema({
  body: String
});
var AffirmationPro = mongoose.model("AffirmationPro", affirmationSchema);

module.exports = AffirmationPro;
