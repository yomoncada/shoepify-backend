const express = require('express');

const {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart
} = require('../../controllers/carts.controllers');

const router = express.Router();

router.get('/', createCart);
router.delete('/:id', deleteCart);
router.get('/:id/products', getCartProducts);
router.post('/:id/products/', addProductToCart);
router.delete('/:cartId/products/:productId', deleteProductFromCart);

module.exports = router;