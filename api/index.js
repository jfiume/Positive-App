var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(upload.array());

var user = require('./routes/user.js');
var affirmation = require('./routes/affirmation.js');

app.use('/api/user', user);
app.use('/api/affirmation', affirmation);


app.listen(port, () => {
  console.log(`Node listening on port ${port}`);
});
