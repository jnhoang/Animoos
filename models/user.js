const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName:    String
, lastName:     String
, avatar:       String
, watchList:    Array
, favorites:    Array
, userSummary:  String
, username: {
    type:       String
  , required:   true
  , unique:     true
  }
, email: {
    type:       String
  , required:   true
  , unqiue:     true
  }
, password: {
    type:       String
  , required:   true
  }
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    const returnJSON = {
      id:           ret._id
    , avatar:       ret.avatar
    , email:        ret.email
    , favorites:    ret.favorites
    , username:     ret.username
    , userSummary:  ret.userSummary
    , watchList:    ret.watchList
    };

  return returnJSON;
  }
});
UserSchema.methods.authenticated = function(password) {
  const provider          = this;
  const isAuthenticated   = bcrypt.compareSync(password, provider.password);

  return isAuthenticated ? provider : false;
}
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);