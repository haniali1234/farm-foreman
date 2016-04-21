var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./model/user.js');
require('./model/company.js');
require('./model/task.js');
require('./model/job.js');
require('./model/entity.js');
require('./model/location.js');
require('./model/client.js');
mongoose.connect(process.env.MONGO_URI);

var routes = require('./routes/index');
var users = require('./routes/users');
var companies = require('./routes/companies');
var tasks = require('./routes/tasks');
var jobs = require('./routes/jobs');
var entities = require('./routes/entities');
var locations = require('./routes/locations');
var clients = require('./routes/clients');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(passport.initialize());
passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, next) {

  var User = mongoose.model('User');

  User.findOne({email: email}, function (err, user) {
    if (err) return next(err);
    if (!user) return next(null, false, {message: 'Incorrect username.'});

    user.validPassword(password, function (err, isMatch) {
      if (err) return next(err);
      if (!isMatch) return next(null, false);
      return next(null, user);
    });
  });
}));

app.use('/', routes);
app.use('/users', users);
app.use('/companies', companies);
app.use('/tasks', tasks);
app.use('/jobs', jobs);
app.use('/entities', entities);
app.use('/locations', locations);
app.use('/clients', clients);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log('the first ' + err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log('the second ' + err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
