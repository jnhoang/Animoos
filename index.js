// requires and global variables
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rp = require('request-promise');

const expressJWT = require('express-jwt');
const secret = process.env.JWT_SECRET;

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
app.use('/api/users', expressJWT({secret: secret})
  .unless({
    path: [{ url: '/api/users', methods: ['POST'] }]
  }), require('./controllers/users'));

app.use('/api/anilist', require('./controllers/anime_show_controller'));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).status({ message: 'You need an authorization token to view this information.' });
  }
});

// Angular route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// listen
app.listen(process.env.PORT || 3000, () => console.log('Animoo server up'));