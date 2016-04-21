var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  uuid = require('node-uuid'),
  Mailgun = require('mailgun').Mailgun,
  jwt = require('../modules/jwt.js'),
  _ = require('lodash');

router.param('userId', function (req, res, next, userId) {
  User.findById(userId, function (err, user) {
    if (err) return res.sendStatus(404);
    req.use = user;
    next();
  });
});

/* GET users listing. */
router.route('/')
  .get(jwt.protect, function (req, res) {
    User.find(function (err, users) {
      res.json(users);
    });
  })
  .post(jwt.protect, function (req, res) {
    var user = new User(req.body),
      emailUser = false,
      generatedPassword;

    //if no password entered, generate a password and email it to the user.
    if (!user.password) {
      user.password = generatedPassword = uuid.v4().split('-').pop();
      emailUser = true;
    }

    user.save(function (err) {
      if (emailUser) {
        var mg = new Mailgun(process.env.MAILGUN);
        mg.sendText('admin@westhillsfinancial.com', [user.email],
          "You've been added to the Farm Foreman Application",
          'You have been added as a user to the Farm Foreman application.  Your password is ' + generatedPassword +
          '.  You can login to the application at ' + process.env.APPURL + '.  Thanks!', 'noreply@westhillsfinancial.com',
          {}, function (err) {
            if (err) return res.status(400).json(err);
            res.json(user);
          });
      } else {
        res.json(user);
      }
    });
  });

router.route('/:userId')
  .put(jwt.protect, function (req, res) {
    User.findById(req.params.userId, function (err, user) {
      _.merge(user, _.omit(req.body, ['password']));

      if (req.body.password) {
        user.password = req.body.password;
      }

      user.save(function (err) {
        res.sendStatus(200);
      });
    });
  })
  .get(jwt.protect, function (req, res) {
    res.json(req.use);
  })
  .delete(jwt.protect, function (req, res) {
    User.findByIdAndUpdate(req.params.userId, {$set: {deleted_at: Date.now()}}, function (err) {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
    });
  });

module.exports = router;
