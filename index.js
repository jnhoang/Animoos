// requires and global variables
require('dotenv').config();
var express     = require('express');
var bodyParser  = require('body-parser');
var path        = require('path');
var rp          = require('request-promise');

// JSON web token dependencies
var expressJWT  = require('express-jwt');
// var jwt         = require('jsonwebtoken');
var secret      = process.env.JWT_SECRET;

var app = express();

/* CONFIG */
var config = {
  bodyParserOption  : { extended : false  },
  expressJwtOption  : { secret   : secret },
  securityOption    : {
    path: [
      { 
        url       : '/api/users/signup',
        methods   : ['POST']
      },
      {
        url       : '/api/users/login',
        methods   : ['POST']
      }
    ]
  }
};

// mongoose models and connection
var mongoose  = require('mongoose');
var User      = require('./models/user');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/animoos');

// set and use statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(config.bodyParserOption));
app.use(express.static(path.join(__dirname, 'app')));
app.use(require('morgan')('dev'));

// routes
// controllers
app.use(
  '/api/users', 
  expressJWT(config.expressJwtOption).unless(config.securityOption), 
  require('./controllers/users')
);


app.use('/api/anilist', require('./controllers/anime_show_controller'));


/* Unauthorized Access Catch */
app.use(function (err, req, res, next) {
  var statusMsg401 = {
    message: 'You need an authorization token to view this information.'
  };

  if (err.name === 'UnauthorizedError') {
    res
    .status(401)
    .status(statusMsg401);
    console.log('unauthorized access')
  }
  if (err) {
    console.log('error: ', err);
  }
});


// Angular route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// listen
app.listen(process.env.PORT || 3000, () => console.log('Animoo server up'));