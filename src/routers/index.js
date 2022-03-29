const express = require('express');
const productsRoutes = require('./products/products.routes');
const cartRoutes = require('./cart/cart.routes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartRoutes);

module.exports = router;