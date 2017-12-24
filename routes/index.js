var express = require('express');
var router = express.Router();
var User = require('../model/users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});


router.post('/login', function (req, res, next) {
    console.log(req.body.email);

   User.find({
       email: req.body.email,
       password: req.body.password
   },function(err, user) {

       if(user.length){
           res.render('admin-panel');
       } else{
           res.render('index', {title: 'Express'});
       }

   });

})

router.get('/admin', function (req, res, next) {
    res.render('admin-panel', {title: 'Express'});
});


module.exports = router;
