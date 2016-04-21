var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Entity = mongoose.model('Entity'),
  Location = mongoose.model('Location'),
  Task = mongoose.model('Task'),
  jwt = require('../modules/jwt.js');

router.param('jobId', function (req, res, next, jobId) {
  Job.findById(jobId, function (err, job) {
    if (err) return res.sendStatus(404);
    req.job = job;
    next();
  });
});

/* GET and Post companies listing. */
router.route('/')
  .get(jwt.protect, function (req, res) {
    Job.find().populate('entity tasks').exec(function (err, jobs) {
      res.json(jobs);
    });
  })
  .post(jwt.protect, function (req, res) {
    var Jobs = require('../modules/jobs');

    var data = {
      location: req.body.location,
      entity: req.body.entity,
      tasks: req.body.tasks,
      date: req.body.date,
      notes: req.body.notes
    };

    Jobs.create(data, req.user)
      .then(function (job) {
        res.json(job);
      }, function (err) {
        res.status(400).json(err);
      });
  });

/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:jobId')
  .put(jwt.protect, function (req, res) {
    req.job.update({$set: req.body}, {new: true}, function (err, job) {
      res.sendStatus(200);
    });
  })
  .get(jwt.protect, function (req, res) {
    res.json(req.job);
  })
  .delete(jwt.protect, function (req, res) {
    Job.findByIdAndUpdate(req.params.jobId, {$set: {deleted_at: Date.now()}}, function (err) {
      if (err) return res.status(400).json(err);
      res.sendStatus(200);
    });
  });


module.exports = router;
