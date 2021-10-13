const GeneralAppName = "MABooks";

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { SiteName: GeneralAppName, pageTitle: 'Page Not Found', Navpath: '/404', isAuthenticated: req.isLoggedIn });
  };
  