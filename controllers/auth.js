const GeneralAppName = "MABooks";

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
//const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

// const transporter = nodermailer.createTransport(sendgridTransport({
//     auth: {
//       api_key: 
//     }
// }));

const transporter = nodemailer.createTransport({
  host: "mail.cse341.fullstackwebdeveloper.xyz",
  port: 465,
  secure: true,
  auth: {
    user: "store@cse341.fullstackwebdeveloper.xyz", // generated ethereal user
    pass: "lzFdx2ii" // generated ethereal password
  }
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    SiteName: GeneralAppName,
    Navpath: 'Login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    SiteName: GeneralAppName,
    Navpath: 'Signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email: email
    })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const uName = req.body.uName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email: email
    })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email exists already, please enter a different one.');
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: uName,
            email: email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: "store@cse341.fullstackwebdeveloper.xyz",
            subject: "Welcome to MABooks",
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  })
};