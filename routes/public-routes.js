const GeneralAppName = "My E-commerce App";

const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const books = adminData.books;
    res.render('store', {
    bookList: books,
    SiteName: GeneralAppName,
    pageTitle: 'Our Shop',
    Navpath: 'Home'
    });
});

module.exports = router;