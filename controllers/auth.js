const GeneralAppName = "MABooks";

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req
  .get('Cookie')
  .split(';')[3]
  .trim()
  .split('=')[1];
  res.render('auth/login', {
    SiteName: GeneralAppName,
    Navpath: 'Login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};