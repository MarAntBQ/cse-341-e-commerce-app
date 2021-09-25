const GeneralAppName = "My E-commerce App";

const path = require('path');

const express = require('express');

const router = express.Router();

const books = [];

// /admin/add-product => GET
router.get('/add-book', (req, res, next) => {
  res.render('add-book', {
    pageTitle: 'Add Book',
    SiteName: GeneralAppName,
    Navpath: 'AddNewBook'
  });
});
// /admin/add-product => POST
router.post('/add-book', (req, res, next) => {
  books.push({
      BookName: req.body.BookName,
      BookISBN: req.body.BookISBN,
      BookAuthor: req.body.BookAuthor,
      BookPublishYear: req.body.BookPublishYear
    });
  res.redirect('/');
});

router.post('/remove-book', (req, res, next) => {
    const DeleteBook = req.body.BookToDelete;
    //const index = books.BookISBN.indexOf(DeleteBook);
    for(var i = 0, len = books.length; i < len; i++) {
        if (books[i].BookISBN === DeleteBook) {
            books.splice(i, 1);
            break;
        }
    }
    res.redirect('/');
  });

exports.routes = router;
exports.books = books;