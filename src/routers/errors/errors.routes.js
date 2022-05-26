const express = require('express');
const router = express.Router();

router.get('/login-error', function(req, res) {
  res.render('pages/errors/login');
});

router.get('/register-error', function(req, res) {
  res.render('pages/errors/register');
});

module.exports = router;