var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var mongodb = require("mongodb");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var user = require('./routes/user.js');
var affirmation = require('./routes/affirmation.js');


var uri = require('../.gitignore/mongodb_settings.js');
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(uri || "mongodb://localhost:27017/my_db", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
});


app.use('/user', user);
app.use('/affirmation', affirmation);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node listening on port ${port}`);
});
