const GeneralAppName = "MABooks";

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', Navpath: '/404' });
  };
  