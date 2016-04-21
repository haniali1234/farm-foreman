var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Entity = mongoose.model('Entity'),
  Location = mongoose.model('Location'),
  Client = mongoose.model('Client'),
  jwt = require('../modules/jwt.js');

router.param('entityId', function (req, res, next, entityId) {
  Entity.findById(entityId, function (err, entity) {
    if (err) return res.sendStatus(404);
    req.entity = entity;
    next();
  });
});

/* GET and Post companies listing. */
router.route('/')
  .get(jwt.protect, function (req, res) {
    Entity.find().populate('location owners').exec(function (err, entities) {

      res.json(entities);
    });
  })
  .post(jwt.protect, function (req, res) {

    var Clients = require('../modules/clients'),
      Locations = require('../modules/locations'),
      Entities = require('../modules/entities');

    Clients.create(req.body.owners)
      .then(function (clients) {
        Locations.create(req.body.location)
          .then(function (locs) {
            Entities.create({
                company_name: req.body.company_name,
                company_phone: req.body.company_phone,
                company_email: req.body.company_email,
                location: _.map(locs, '_id'),
                owners: _.map(clients, '_id')
              })
              .then(function (entity) {
                //update the clients to add entity ID
                Clients.update(clients, {entity: entity._id})
                  .then(function (clients) {

                    //update the locations to add entity ID
                    Locations.update(locs, {entity: entity._id})
                      .then(function (locs) {
                        Location.populate(entity, 'location', function (err, entity) {
                          Client.populate(entity, 'owners', function (err, entity) {
                            res.json(entity);
                          });
                        });
                      });
                  });
              });
          });
      });
  });

/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:entityId')
  .put(jwt.protect, function (req, res) {
    req.entity.update({$set: req.body}, {new: true}, function (err, entity) {
      res.sendStatus(200);
    });
  })
  .get(jwt.protect, function (req, res) {
    res.json(req.entity);
  })
  .delete(jwt.protect, function (req, res) {
    Entity.findByIdAndUpdate(req.params.entityId, {$set: {deleted_at: Date.now()}}, function (err) {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
    });
  });

module.exports = router;
