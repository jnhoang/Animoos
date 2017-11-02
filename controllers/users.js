// set and require statements
require('dotenv').config();
var express   = require('express');
var jwt       = require('jsonwebtoken');
var User      = require('../models/user');

var router = express.Router();


// if Authenticated, returns a signed JWT
router.post('/auth', function(req, res) {
  var mongoParams = { username: req.body.username }
  
  User.findOne(mongoParams, function(err, user) {
    
    // returns 401 if error or not a user
    if (err || !user) return res.status(401).send({ message: 'User not found' });
    
    // checks provided password against db password
    var isAuthenticated = user.authenticated(req.body.password);
    
    // returns 401 if error or bad password
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated'});
    
    // all checks cleared, creates new jwt token
    var token = jwt.sign(user.toJSON(), secret);
    
    // returns token
    
    return res.send({ user: user, token: token });
  });  
});

router.route('/')
  
  // returns object of all users
  .get(function(req, res) {
    console.log('receiving request for all users: ', req.body);
    User.find(function(err, users) {
      if (err) res.status(500).send(err);

      return res.send(users);
    });
  })
  
  /*
  ** add new user to db
  ** receives user object
  ** find the user first in case the email already exists
  */
  .post(function(req, res) {
    console.log('receiving request to post new user: ', req.body);
    User.findOne({ username: req.body.username }, function(err, user) {
      if (user) {
        return res.status(400).send({ message: 'Username or email already exists in the system' });
      }

      User.create(req.body, function(err, user) {
        if (err) return res.status(500).send(err);

        return res.send(user);
      });
    });
  });

router.route('/:id')
  
  // receives id, finds single user by id
  .get(function(req, res) {
    console.log('receiving request for single user: ', req.body);
    User.findById(req.params.id, function(err, user) {
      if (err) return res.staus(500).send(err);

      return res.send(user);
    });
  })

  /*
  ** receives user id & update info
  ** finds user by id and updates their info
  */
  .put(function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    });
  })

  /*
  ** receives user id
  ** deletes specified user from db
  */
  .delete(function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);

      return res.send({ message: 'success' });
    } )
  })

module.exports = router;