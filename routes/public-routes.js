const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const books = adminData.books;
    //console.log(adminData.books);
    res.render('store', {
    bookList: books,
    pageTitle: 'Shop',
    Navpath: 'Home'
    });
});

module.exports = router;