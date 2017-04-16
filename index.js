// requires and global variables
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var rp = require('request-promise');
var app = express();

// set and use statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

// routes
// controllers
app.use('/api/anilist', require('./controllers/anime_show_controller'));

// Angular route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// listen
app.listen(process.env.PORT || 3000);