var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Client = mongoose.model('Client'),
    Entity = mongoose.model('Entity'),
    jwt = require('../modules/jwt.js');


router.param('clientId', function (req, res, next, clientId) {
    Client.findById(clientId, function (err, client) {
        if (err) return res.sendStatus(404);
        req.client = client;
        next();
    });
});

/* GET and Post companies listing. */
router.route('/')
    .get(jwt.protect, function(req, res, next) {
        Client.find(function(err, clients) {
            res.json(clients);
        });
    })
    .post(jwt.protect, function(req, res){
        var client = new Client(req.body);
        client.save(function (err) {
          Entity.findById(client.entity, function(err, entity){
            if(err) return res.status(400).json(err);
            if(!entity) return res.json(client);

            entity.owners.push(client._id);
            entity.save(function(err){
              if(err) return res.status(400).json(err);
              res.json(client);
            });
          });
        });
    });


/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:clientId')
    .put(jwt.protect, function(req, res){
        req.client.update({$set: req.body}, {new: true}, function (err, client) {
            res.sendStatus(200);
        });
    })
    .get(jwt.protect, function(req, res){
        res.json(req.client);
    })
    .delete(jwt.protect, function(req, res){
        Client.findByIdAndUpdate(req.params.clientId, {$set: {deleted_at: Date.now()}}, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        });
    });

module.exports = router;
