const GeneralAppName = "MABooks";

const Product = require('../models/product');
const Order = require('../models/order');

const Informations = require('../models/week8');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/store', {
        SiteName: GeneralAppName,
        prods: products,
        pageTitle: 'All Products',
        Navpath: 'Products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  let UserName = "";
  if (req.user) {
    UserName = req.user.name;
  } else {
    UserName = "";
  }
  Product.find()
    .then(products => {
      res.render('shop/index', {
        SiteName: GeneralAppName,
        prods: products,
        pageTitle: 'MABooks',
        Navpath: 'Home',
        UName: UserName
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
const https = require('https');
const ITEMS_PER_PAGE = 10;

exports.getWeek8 = (req, res, next) => {
  const page = req.query.page || 1;
  console.log(page);
  Informations.fetchAll((products) => {
    //console.log(products.length);
    const lengthJSON = products.length;
    const TotalNumofPages = lengthJSON / ITEMS_PER_PAGE;
    const pageStart = (page - 1) * ITEMS_PER_PAGE;
    const indexEnd = page * ITEMS_PER_PAGE;
    //console.log(TotalNumofPages);
    res.render('shop/week8', {
      SiteName: GeneralAppName,
      lists: products.slice(pageStart, indexEnd),
      //lists: products,
      page: page,
      infol: TotalNumofPages,
      pageTitle: 'Week 08 Prove Assignment',
      Navpath: 'week8'
    })
  });

};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      console.log(products);
      res.render('shop/cart', {
        SiteName: GeneralAppName,
        Navpath: 'Cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
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
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: {
            ...i.productId._doc
          }
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({
      'user.userId': req.user._id
    })
    .then(orders => {
      res.render('shop/orders', {
        SiteName: GeneralAppName,
        Navpath: 'Orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    SiteName: GeneralAppName,
    Navpath: 'Checkout',
    pageTitle: 'Checkout'
  });
};