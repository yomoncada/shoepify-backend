const express = require('express');
const passport = require('../../middlewares/passport');
const auth = require('../../middlewares/auth');

const {
    login,
    register,
    logout
} = require('../../controllers/auth.controllers');

const router = express.Router();

router.route('/login')
    .get(auth.alreadyAuthenticated, (req, res, next) => {
        res.render('pages/user/login');
    })
    .post((req, res, next) => {
      req.body = req.fields;
      next();
    }, passport.authenticate('login', { failureRedirect: '/login-error' }),
    login);

router.route('/register')
    .get(auth.alreadyAuthenticated, (req, res, next) => {
        res.render('pages/user/register');
    })
    .post((req, res, next) => {
      req.body = req.fields;
      next();
    },
    passport.authenticate('register', { failureRedirect: '/register-error' }), 
    register);

router.get('/logout', auth.isLoggedIn, logout);

module.exports = router;