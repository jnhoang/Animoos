const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  firstName: String
, lastName: String
, username: {
    type: String
  , required: true
  , unique: true
  }
, email: {
    type: String
  , required: true
  , unqiue: true
  }
, password: {
    type: String
  , required: true
  }
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    const returnJSON = {
      id:           ret.id
    , email:        ret.email
    , firstName:    ret.firstName
    , lastName:     ret.lastName
    , username:     ret.username
    };

  return returnJSON;
  }
});
UserScheme.methods.authenticated = (password) => {
  const provider = this;
  const isAuthenticated = bcrypt.compareSync(password, provider.password);

  return isAuthenicated ? provider : false;
}
UserSchema.pre('save', (next) => {
  this.isModified('password') ? this.password = bcrypt.hashSync(this.password, 10) : null;
  next();
});

module.exports = mongoose.model('User', UserSchema);