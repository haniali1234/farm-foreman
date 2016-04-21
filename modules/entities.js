'use strict';

var q = require('q'),
    mongoose = require('mongoose'),
    Entity = mongoose.model('Entity');

module.exports = {
    create: function create(data) {
        var dfrd = q.defer();

        var entity = new Entity(data);
        entity.save(function (err) {
            if (err) return dfrd.reject(err);
            dfrd.resolve(entity);
        });

        return dfrd.promise;
    }
};