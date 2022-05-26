const register = (req, res, next) => res.redirect('/');

const login = (req, res, next) => res.redirect('/');

const logout = (req, res, next) => {
  req.logOut(error => {
    if (error) {
      console.log(error);
    }
  });

  req.session.destroy(error => {
    res.clearCookie('some-session');
    if (error) {
      console.log(error);
    } else {
      console.log('Usuario deslogueado');
      res.redirect('/login');
    }
  })
}

module.exports = {
  login,
  register,
  logout
}