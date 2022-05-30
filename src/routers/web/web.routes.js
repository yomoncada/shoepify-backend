const express = require('express');
const auth = require('../../middlewares/auth');

const {
  renderHome,
  renderProfile,
  renderProductDetail,
  renderCart,
  renderCheckout
} = require('../../controllers/web.controllers');

const router = express.Router();

router.get('/', auth.isLoggedIn, renderHome);
router.get('/profile', auth.isLoggedIn, renderProfile);
router.get('/product-detail/:id', auth.isLoggedIn, renderProductDetail);
router.get('/cart', auth.isLoggedIn, renderCart);
router.get('/checkout', auth.isLoggedIn, renderCheckout);

module.exports = router;