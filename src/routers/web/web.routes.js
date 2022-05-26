const express = require('express');
const auth = require('../../middlewares/auth');
const productUtil = require('../../utils/product.utils');
const cartUtil = require('../../utils/cart.utils');

const router = express.Router();

router.get('/', auth.isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      let session = req.session;

      session.user = {
        id: req.user.id,
        name: req.user.name,
        address: req.user.address,
        phoneNumber: req.user.phoneNumber,
        email: req.user.email
      };
      
      let cart = await cartUtil.getByUser(session.user.id);

      if (!cart) {
        let cart = await cartUtil.create(session.user.id);
      }

      const cartProducts = await cartUtil.getProducts(cart['_id']);

      session.cart = {
        id: cart['_id'],
        products: cartProducts,
        total: await cartUtil.getTotal(cartProducts),
        count: cartProducts.length
      };
    }

    const products = await productUtil.get();

    res.render('pages/index', {products, session: req.session});
  } catch(error) {
    throw new Error(error);
  }
});

router.get('/product-detail/:id', auth.isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productUtil.get(id);
    product.oldPrice = product.price * 2;

    const relatedProducts = await productUtil.get(null, {
        _id: { 
          $ne: id
        }
    }, 5);

    const cart = {
      id: req.session.cart.id
    }

    res.render('pages/products/productDetail', {product, relatedProducts, cart});
  } catch(error) {
    throw new Error(error);
  }
});

router.get('/cart', auth.isLoggedIn, async (req, res, next) => {
  try {
    const cartProducts = await cartUtil.getProducts(req.session.cart.id);

    const cart = {
      id: req.session.cart.id,
      products: cartProducts,
      total: await cartUtil.getTotal(cartProducts),
      count: cartProducts.length
    };

    res.render('pages/products/cart', {cart});
  } catch(error) {
    throw new Error(error);
  }
});

router.get('/checkout', auth.isLoggedIn, async (req, res, next) => {
  try {
    const cartProducts = await cartUtil.getProducts(req.session.cart.id);

    const cart = {
      id: req.session.cart.id,
      products: cartProducts,
      total: await cartUtil.getTotal(cartProducts),
      count: cartProducts.length
    };

    const user = req.session.user;

    res.render('pages/products/checkout', {cart, user});
  } catch(error) {
    throw new Error(error);
  }
});

module.exports = router;