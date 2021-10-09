const GeneralAppName = "MABooks";

const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/store', {
        SiteName: GeneralAppName,
        prods: products,
        pageTitle: 'All Products',
        Navpath: 'Products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        SiteName: GeneralAppName,
        product: product,
        pageTitle: product.title,
        Navpath: 'Products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        SiteName: GeneralAppName,
        prods: products,
        pageTitle: 'MABooks',
        Navpath: 'Home'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        SiteName: GeneralAppName,
        Navpath: 'Cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        SiteName: GeneralAppName,
        Navpath: 'Orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    SiteName: GeneralAppName,
    Navpath: 'Checkout',
    pageTitle: 'Checkout'
  });
};