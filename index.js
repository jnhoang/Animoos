// requires and global variables
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rp = require('request-promise');
const app = express();

// mongoose models and connection
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect(/*process.env.MONGOLAB || */'mongodb://localhost/animoos');

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
app.listen(process.env.PORT || 3000, () => console.log('Animoo server up'));