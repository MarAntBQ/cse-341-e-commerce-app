const GeneralAppName = "MABooks";

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    SiteName: GeneralAppName,
    pageTitle: 'Add Product',
    Navpath: 'AddNewProduct',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;
  const pyear = req.body.pyear;
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
        Navpath: '/admin/edit-product',
        SiteName: GeneralAppName,
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
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
  Product.findById(prodId).then(product => {
      product.title = updatedTitle;
      product.isbn = isbn;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.author = author;
      product.pyear = pyear;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
  //.select('title price -_id')
 //   .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        SiteName: GeneralAppName,
        pageTitle: 'Admin Products',
        Navpath: 'AdminProducts',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};