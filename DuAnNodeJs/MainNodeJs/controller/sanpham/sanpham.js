var express = require("express");
var router = express.Router();

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0"
    );
    next();
  } else {
    req.flash("error_messages", "Please Login to continue !");
    res.redirect("/login");
  }
}

var Product = require("../../model/sanpham/products");

// router.get('/products', (req, res) => {
//     Product.find({}, function(err, products) {
//         res.render('products', {
//             productsList: products
//         })
//     })
// })


router.get('/updateKetqua/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneketqua = await Product.findById(id).exec();
    res.render('showProduct', {
        ketqua: oneketqua
    });
} catch (error) {
    res.status(400).send(error.message);
}
})

router.get("/products", (req, res, next) => {
  let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1;

  Product.find() // find tất cả các sản phẩm
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        // đếm để tính xem có bao nhiêu trang
        if (err) return next(err);
        res.render("products", {
          products, // sản phẩm trên một page
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage), // tổng số các page
        });
      });
    });
});

router.get("/news/:page", (req, res, next) => {
  let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1;

  Product.find() // find tất cả các data
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        // đếm để tính xem có bao nhiêu trang
        if (err) return next(err);
        res.render("products", {
          products, // sản phẩm trên một page
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage), // tổng số các page
        });
      });
    });
});

module.exports = router;
