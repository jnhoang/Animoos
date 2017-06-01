// requires and global variables
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rp = require('request-promise');

// JSON web token dependencies
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
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
    console.log('unauthorized access')
  }
  if (err) {
    console.log('error: ', err);
  }
});

// if Authenticated, returns a sugned JWT
app.post('/api/auth', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    // returns 401 if error or not a user
    if (err || !user) return res.status(401).send({ message: 'User not found' });
    // checks provided password against db password
    const isAuthenticated = user.authenticated(req.body.password);
    // returns 401 if error or bad password
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated'});
    // all checks cleared, creates new jwt token
    const token = jwt.sign(user.toJSON(), secret);
    
    // returns token
    return res.send({ user: user, token: token });
  });  
});

// Angular route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// listen
app.listen(process.env.PORT || 3000, () => console.log('Animoo server up'));