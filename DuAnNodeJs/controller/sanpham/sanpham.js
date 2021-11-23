var express = require('express');
var router = express.Router();

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

var Product = require("../../model/sanpham/products");

router.get('/products',checkAuth, (req, res) => {
    Product.find({}, function(err, products) {
        res.render('products', {
            productsList: products
        })
    })
})

module.exports = router;
