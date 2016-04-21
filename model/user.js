'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  _ = require('lodash');

var UserSchema = new mongoose.Schema({

  first_name: String,
  last_name: String,
  email: String,
  password: String,
  admin: Boolean,
  active: {type: Boolean, default: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  deleted_at: {type: Date, default: null}
});

UserSchema.pre('save', function preSave(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function () {
    }, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function toJSON() {
  return _.omit(this.toObject(), ['password']);
};

UserSchema.methods.validPassword = function validPassword(password, cb) {
  return bcrypt.compare(password, this.password, cb);
};

mongoose.model('User', UserSchema);
