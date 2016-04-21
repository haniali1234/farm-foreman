'use strict';

var q = require('q'),
    mongoose = require('mongoose'),
    Task = mongoose.model('Task');

module.exports = {
    create: function create(data) {
        var dfrd = q.defer();

        var task = new Task(data);
        task.save(function (err) {
            if (err) return dfrd.reject(err);
            dfrd.resolve(task);
        });

        return dfrd.promise;
    }
};