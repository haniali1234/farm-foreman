'use strict';

var q = require('q'),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job');

module.exports = {
  create: function create(data, user) {
    var dfrd = q.defer(),
      job = new Job(data);

    job.foreman = user._id;

    job.save(function (err) {
      if (err) return dfrd.reject(err);
      dfrd.resolve(job);
    });

    return dfrd.promise;
  }
};