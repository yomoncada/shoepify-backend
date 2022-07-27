const express = require('express');
const ErrorMiddleware = require('../app/Middlewares/ErrorMiddleware');

const AuthRoutes = require('./auth/auth');
const CartsRoutes = require('./carts/carts');
const OrdersRoutes = require('./orders/orders');
const ProductsRoutes = require('./products/products');
const WebRoutes = require('./web/web');

const router = express.Router();

router.use(AuthRoutes.initialize());
router.use(CartsRoutes.initialize('/api/carts'));
router.use(OrdersRoutes.initialize('/api/orders'));
router.use(ProductsRoutes.initialize('/api/products'));
router.use(WebRoutes.initialize());

router.use(ErrorMiddleware.handle);

module.exports = router;