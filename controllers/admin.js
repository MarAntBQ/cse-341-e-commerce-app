const GeneralAppName = "MABooks";

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    SiteName: GeneralAppName,
    pageTitle: 'Add Product',
    Navpath: 'AddNewProduct',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;
  const pyear = req.body.pyear;
  req.user
    .createProduct({
      title: title,
      price: price,
      isbn: isbn,
      author: author,
      pyear: pyear,
      description: description
    })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     if (!product) {
//       return res.redirect('/');
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       Navpath: '/admin/edit-product',
//       SiteName: GeneralAppName,
//       editing: editMode,
//       product: product
//     });
//   });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const title = req.body.title;
//   const isbn = req.body.isbn;
//   const price = req.body.price;
//   const description = req.body.description;
//   const author = req.body.author;
//   const pyear = req.body.pyear;
//   const product = new Product(prodId, title, isbn, price, description, author, pyear);
//   product.save();
//   res.redirect('/admin/products');
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('admin/products', {
//       prods: products,
//       SiteName: GeneralAppName,
//       pageTitle: 'Admin Products',
//       Navpath: 'AdminProducts'
//     });
//   });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId);
//   res.redirect('/admin/products');
// };
