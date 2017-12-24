var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});


router.post('/login', function (req, res, next) {
    console.log(req.body.email);
    if (req.body.email == 'pratisha@gmail.com' && req.body.password == 'pratisha01') {
        console.log('matches');
        res.render('admin-panel');
    }
    else {
        res.render('index', {title: 'Express'});

    }
})

router.get('/admin', function (req, res, next) {
    res.render('admin-panel', {title: 'Express'});
});


module.exports = router;
