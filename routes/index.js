var express = require('express');
var router = express.Router();
var User = require('../model/users');
var Homestays = require('../model/homestays');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Yaatra'});
});

router.get('/login', function (req, res, next) {
    if(req.session.useremail){
        res.render('admin-panel', {title: 'Yaatra'});
    } else {
        res.render('login', {title: 'Yaatra'});
    }
});


router.post('/login', function (req, res, next) {
    // console.log(req.body.email);
    // console.log('session',req.session);


    User.find({
       email: req.body.email,
       password: req.body.password
   },function(err, user) {

       if(user.length){
           req.session.useremail = req.body.email;
           res.render('admin-panel');
       } else{
           res.render('index', {title: 'Yaatra'});
       }

   });

})

//get all homestays
router.get('/homestays', function(req, res, next) {
    Homestays.find(function(err, homestay) {

        if(req.session.useremail){
            res.render('homestays', {homestay: homestay});
        } else {
            res.render('index', {title: 'Yaatra'});
        }
    })

});

//create homestays
router.post('/homestays', function(req, res, next) {
    var data = {
        name : req.body.name,
        price : req.body.price,
        location : req.body.location,
        description : req.body.description
    }

    homestays.create(data,function(err,homestay) {
        if(err){
            console.log(err);
        } else{
            console.log('success');
        }
    })
});

//delete homestays
router.post('/homestays/delete/:id', function(req, res, next) {
    Homestays.remove({'_id': req.params.id},function(err, res) {
        if(err){
            console.log(err);
        } else{
            console.log('success');
        }
    })
});

//get homestay
router.get('/homestays/:id', function(req, res, next) {

    console.log('in homestay id');

    Homestays.find({'_id': req.params.id},function(err, data) {
        if(err){
            console.log(err);
        } else{
            console.log('homestay',data);
        }
    })
});


router.get('/admin', function (req, res, next) {
    if(req.session.useremail){
        res.render('admin-panel', {title: 'Yaatra'});
    } else {
        res.render('index', {title: 'Yaatra'});
    }
});


module.exports = router;
