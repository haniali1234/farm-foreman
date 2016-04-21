var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  Entity = mongoose.model('Entity'),
  jwt = require('../modules/jwt.js');

router.param('locationId', function (req, res, next, locationId) {
  Location.findById(locationId, function (err, location) {
      if (err) return res.sendStatus(404);
      req.location = location;
      next();
    })
    .then();
});

/* GET and Post companies listing. */
router.route('/')
  .get(jwt.protect, function (req, res, next) {
    Location.find(function (err, locations) {
      res.json(locations);
    });
  })
  .post(jwt.protect, function (req, res) {
    var location = new Location(req.body);
    location.save(function (err) {
      Entity.findById(location.entity, function (err, entity) {
        if (err) return res.status(400).json(err);
        if (!entity) return res.json(location);

        entity.location.push(location._id);
        entity.save(function (err) {
          if (err) return res.status(400).json(err);
          res.json(location);
        });
      });
    });
  });

/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:locationId')
  .put(jwt.protect, function (req, res) {
    req.location.update({$set: req.body}, {new: true}, function (err, location) {
      res.sendStatus(200);
    });
  })
  .get(jwt.protect, function (req, res) {
    res.json(req.location);
  })
  .delete(jwt.protect, function (req, res) {
    Location.findByIdAndUpdate(req.params.locationId, {$set: {deleted_at: Date.now()}}, function (err) {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
    });
  });

module.exports = router;
