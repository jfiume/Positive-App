var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var user = require('./routes/user.js');
var affirmation = require('./routes/affirmation.js');

app.use('/user', user);
app.use('/affirmation', affirmation);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node listening on port ${port}`);
});
