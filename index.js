const path = require('path');

const GeneralAppName = "My E-commerce App";

const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/public-routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//app.listen(3000);

mongoConnect(() =>{
    app.listen(3000);
});