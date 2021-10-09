const path = require('path');

const GeneralAppName = "My E-commerce App";

const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/public-routes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('6160e29ad2d59ddbbdabc0eb')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
//   });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect(
  'mongodb+srv://MarAntBQ:twG4DxEpNKuZ8Ooq@cluster0.wjhk8.mongodb.net/shop?retryWrites=true&w=majority'
  )
.then(result => {
  console.log('connected');
  app.listen(3000);
})
.catch(
  err => {
    console.log(err);
  });