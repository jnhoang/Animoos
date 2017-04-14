// requires and global variables
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// routes and controllers
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// listen
app.listen(process.env.PORT || 3000);