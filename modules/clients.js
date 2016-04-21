'use strict';

var q = require('q'),
  mongoose = require('mongoose'),
  Client = mongoose.model('Client'),
  async = require('async');

module.exports = {
  create: function create(clients) {
    var dfrd = q.defer();

    async.map(clients, function (client, callback) {
      var cli = new Client(client);

      cli.save(function (err) {
        if (err) return dfrd.reject(err);
        callback(null, cli);
      });
    }, function (err, result) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(result);
    });

    return dfrd.promise;
  },
  update: function update(clients, data) {
    var dfrd = q.defer();

    async.map(clients, function (client, callback) {
      client.update({$set: data}, {new: true}, function (err, client) {
        if (err) dfrd.reject(err);
        callback(null, client);
      });
    }, function (err, results) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(results);
    });

    return dfrd.promise;
  }
};
