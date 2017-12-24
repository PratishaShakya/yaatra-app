var express = require('express');
var router = express.Router();
var User = require('../model/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    if(req.session.useremail){
        res.render('admin-panel', {title: 'Express'});
    } else {
        res.render('login', {title: 'Express'});
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
           res.render('index', {title: 'Express'});
       }

   });

})

router.get('/admin', function (req, res, next) {
    if(req.session.useremail){
        res.render('admin-panel', {title: 'Express'});
    } else {
        res.render('index', {title: 'Express'});
    }
});


module.exports = router;
