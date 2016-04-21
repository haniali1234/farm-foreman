var express = require('express'),
     router = express.Router(),
     mongoose = require('mongoose');


router.param('adminId', function (req, res, next, adminId) {
     Admin.findById(adminId, function (err, admin) {
         if (err) return res.sendStatus(404);
         req.admin = admin;
         next();
     });
});

/* GET and Post companies listing. */
router.route('/')
       .get(function (req, res) {

         Admin.find(function (err, admins){

             res.json(admins);

         });
     })
     .post(function (req,res){
         var admin = new Admin(req.body);
         admin.save(function (err) {
             res.json(admin);
         });
     });

/*  GET, Edit with PUT, and DELETE companies by their Id's  */
router.route('/:adminId')
     .put(function (req, res){
         req.admin.update({$set: req.body}, {new: true}, function (err, admin) {
             res.sendStatus(200);
         });
     })
     .get(function(req, res){
         res.json(req.admin);
     })
     .delete(function(req, res){
         Admin.findByIdAndRemove(req.params.adminId, function(err){
             if(err) return res.status(400).json(err);
             res.sendStatus(200);
         });
     });

module.exports = router;
