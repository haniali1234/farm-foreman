var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    jwt = require('../modules/jwt.js');


router.param('taskId', function (req, res, next, taskId) {
    Task.findById(taskId, function (err, task) {
        if (err) return res.sendStatus(404);
        req.task = task;
        next();
    });
});

/* GET and Post companies listing. */
router.route('/')
      .get(jwt.protect, function(req, res) {
        Task.find(function(err, tasks){
            res.json(tasks);
        });
    })
    .post(jwt.protect, function(req,res){
        var task = new Task(req.body);
        task.save(function (err) {
            res.json(task);
        });
    });

/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:taskId')
    .put(jwt.protect, function(req, res){
        req.task.update({$set: req.body}, {new: true}, function (err, task) {
            res.sendStatus(200);
        });
    })
    .get(jwt.protect, function(req, res){
        res.json(req.task);
    })
    .delete(jwt.protect, function(req, res){
        Task.findByIdAndUpdate(req.params.taskId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
