'use strict';

var q = require('q'),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  async = require('async');

module.exports = {
  create: function create(locations) {
    var dfrd = q.defer();

    async.map(locations, function (location, callback) {
      var loc = new Location(location);
      loc.save(function (err) {
        if (err) return dfrd.reject(err);
        callback(null, loc);
      });
    }, function (err, result) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(result);
    });

    return dfrd.promise;
  },
  update: function update(locations, data) {
    var dfrd = q.defer();

    async.map(locations, function (loc, callback) {
      loc.update({$set: data}, {new: true}, function (err, loc) {
        if (err) dfrd.reject(err);
        callback(null, loc);
      });
    }, function (err, results) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(results);
    });

    return dfrd.promise;
  }
};
