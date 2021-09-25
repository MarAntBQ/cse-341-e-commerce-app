const path = require('path');

const GeneralAppName = "My E-commerce App";

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

//It's importing form other  js folders
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/public-routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes); //We created a subroute, it's really cool, I couldn't do it with htaccess
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not Found!', SiteName: GeneralAppName, Navpath: 'Not Found'});
});

app.listen(3000);