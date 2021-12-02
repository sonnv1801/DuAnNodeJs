const express = require('express');
const router = express.Router();
const user = require('../model/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('./passportLocal')(passport);


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { logged: true });
    } else {
        res.render("index", { logged: false });
    }
});

router.get('/login', (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
});

router.get('/signup', (req, res) => {
    res.render("signup", { csrfToken: req.csrfToken() });
});

router.post('/signup', (req, res) => {
    // get all the values 
    var phoneNumber =/^(09|03|07|08|05)\(?([0-9]{1})\)?[-.]?([0-9]{4})[-. ]?([0-9]{3})$/;
    const { email, firstname, lastname, phone, date, password, confirmpassword } = req.body;
    // check if the are empty 
    if (!email || !firstname || !lastname || !date || !phone || !password || !confirmpassword) {
        res.render("signup", { err: "Tất cả các trường bắt buộc!", csrfToken: req.csrfToken() });
    } else if (password != confirmpassword) {
        res.render("signup", { err: "Mật khẩu không khớp!", csrfToken: req.csrfToken() });
    } else if (!phone.match(phoneNumber)){
        res.render("signup", { err: "Số điện thoại không đúng!", csrfToken: req.csrfToken() });
    }
    else {

        // validate email and username and password 
        // skipping validation
        // check if a user exists
        user.findOne({ $or: [{ email: email }, { phone: phone } ,  { lastname: lastname }] }, function (err, data) {
            if (err) throw err;
            if (data) {
                res.render("signup", { err: "Người dùng hoặc số điện thoại đã tồn tại, hãy thử đăng nhập!", csrfToken: req.csrfToken() });
            } else {
                // generate a salt
                bcryptjs.genSalt(12, (err, salt) => {
                    if (err) throw err;
                    // hash the password
                    bcryptjs.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        // save user in db
                        user({
                            email: email,
                            password: hash,
                            firstname: firstname,
                            lastname: lastname,
                            phone: phone,
                            date: date,
                        }).save((err, data) => {
                            if (err) throw err;
                            res.redirect('/login');
                        });
                    })
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});

router.get('/pro', (req, res) => {
    res.render('pro')
});


router.get('/profile', checkAuth, (req, res) => {
    // adding a new parameter for checking verification
    res.render('profile', { firstname: req.user.firstname, lastname: req.user.lastname , email: req.user.email, phone: req.user.phone});

});


var Detai = require("../model/detais");

router.get('/detais', checkAuth, (req, res) => {
    Detai.find({}, function(err, detais) {
        res.render('detais', {
            detaisList: detais
        })
    })
})

var Dongxe = require("../model/dongxes");

router.get('/dongxes', checkAuth, (req, res) => {
    Dongxe.find({}, function(err, dongxes) {
        res.render('../views/sanpham/dongxes', {
            dongxesList: dongxes
        })
    })
})


var Image = require("../model/creates");

router.get('/images',  checkAuth, (req, res) => {
    Image.find({}, function(err, creates) {
        res.render('creates', {
            createsList: creates
        })
    })
})


module.exports = router;