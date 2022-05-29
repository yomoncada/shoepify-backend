const express = require('express');
const auth = require('../middlewares/auth');

const productsRoutes = require('./products/products.routes');
const cartsRoutes = require('./carts/carts.routes');
const ordersRoutes = require('./orders/orders.routes');
const layoutsRoutes = require('./layouts/layouts.routes');
const authRoutes = require('./auth/auth.routes');
const webRoutes = require('./web/web.routes');
const errorsRoutes = require('./errors/errors.routes');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/orders', ordersRoutes);
router.use('/layouts', layoutsRoutes);
router.use(authRoutes);
router.use(webRoutes);
router.use(errorsRoutes);

router.get('*', auth.isLoggedIn, function(req, res) {
    res.render('pages/errors/404');
});

module.exports = router;