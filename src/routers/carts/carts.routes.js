const express = require('express');

const {
  getCart,
  deleteCart,
  getCartProducts,
  updateCartProducts,
  addProductToCart,
  deleteProductFromCart
} = require('../../controllers/carts.controllers');

const router = express.Router();

router.get('/', getCart);
router.delete('/:id', deleteCart);
router.route('/:id/products')
  .get(getCartProducts)
  .post(addProductToCart)
  .patch(updateCartProducts);
router.delete('/:cartId/products/:productId', deleteProductFromCart);

module.exports = router;