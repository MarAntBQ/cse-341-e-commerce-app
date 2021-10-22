const GeneralAppName = "MABooks";

const {
  validationResult
} = require('express-validator');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    SiteName: GeneralAppName,
    pageTitle: 'Add Product',
    Navpath: 'AddNewProduct',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;
  const pyear = req.body.pyear;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      Navpath: 'AddNewProduct',
      SiteName: GeneralAppName,
      editing: false,
      hasError: true,
      product: {
        title: title,
        isbn: isbn,
        price: price,
        description: description,
        author: author,
        pyear: pyear
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const product = new Product({
    title: title,
    isbn: isbn,
    price: price,
    description: description,
    author: author,
    pyear: pyear,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        Navpath: 'Edit Product',
        SiteName: GeneralAppName,
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const isbn = req.body.isbn;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const author = req.body.author;
  const pyear = req.body.pyear;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      Navpath: 'Edit Product',
      SiteName: GeneralAppName,
      editing: true,
      hasError: true,
      product: {
        title: updatedTitle,
        isbn: isbn,
        price: updatedPrice,
        description: updatedDesc,
        author: author,
        pyear: pyear,
        _id: prodId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.isbn = isbn;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.author = author;
      product.pyear = pyear;
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find({
      userId: req.user._id
    })
    //{userId: req.user._id}
    //.select('title price -_id')
    //   .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        SiteName: GeneralAppName,
        pageTitle: 'Admin Products',
        Navpath: 'AdminProducts'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({
      _id: prodId,
      userId: req.user._id
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};