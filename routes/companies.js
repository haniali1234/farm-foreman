var express = require('express');
var router = express.Router(),
    mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    jwt = require('../modules/jwt.js');


router.param('companyId', function (req, res, next, companyId) {
    Company.findById(companyId, function (err, company) {
        if (err) return res.sendStatus(404);
        req.company = company;
        next();
    });
});

/* GET and Post companies listing. */
router.route('/')
    .get(jwt.protect, function(req, res, next) {
        res.send('respond with a resource');
    })
    .post(jwt.protect, function(req,res){
        var company = new Company(req.body);
        company.save(function (err) {
            res.json(company);
        });
    });


/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:companyId')
    .put(jwt.protect, function(req, res){
        req.company.update({$set: req.body}, {new: true}, function (err, company) {
            res.sendStatus(200);
        });
    })
    .get(jwt.protect, function(req, res){
        res.json(req.company);
    })
    .delete(jwt.protect, function(req, res){
        Company.findByIdAndRemove(req.params.companyId, function(err){
            if(err) return res.status(400).json(err);
            res.sendStatus(200);
        })
    });

module.exports = router;