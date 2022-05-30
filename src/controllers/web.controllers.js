const productUtil = require('../utils/product.utils');
const cartUtil = require('../utils/cart.utils');

const renderHome = async (req, res, next) => {
    try {
        if (req.user) {
            let session = req.session;
    
            session.user = {
                id: req.user.id,
                name: req.user.name,
                address: req.user.address,
                age: req.user.age,
                phoneNumber: req.user.phoneNumber,
                email: req.user.email,
                avatar: req.user.avatar.filename
            };
            
            let cart = await cartUtil.getByUser(session.user.id);
    
            if (!cart) {
                cart = await cartUtil.create(session.user.id);
            }
    
            session.cart = {
                id: cart._id
            };
        }

        const cartProducts = await cartUtil.getProducts(req.session.cart.id);
        const cartTotals = await cartUtil.getTotals(cartProducts);
    
        const cart = {
            id: req.session.cart.id,
            products: cartProducts,
            total: cartTotals.totalPrice,
            count: cartTotals.totalItems
        };
    
        const products = await productUtil.get();
    
        res.render('pages/index', {products, cart, canLogout: false});
    } catch(error) {
      throw new Error(error);
    }
}

const renderProfile = async (req, res, next) => {
    try {
        const user = req.session.user;

        const cartProducts = await cartUtil.getProducts(req.session.cart.id);
        const cartTotals = await cartUtil.getTotals(cartProducts);
    
        const cart = {
            id: req.session.cart.id,
            products: cartProducts,
            total: cartTotals.totalPrice,
            count: cartTotals.totalItems
        };

        res.render('pages/user/profile', {cart, user, canLogout: true});
    } catch(error) {
      throw new Error(error);
    }
}

const renderProductDetail = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await productUtil.get(id);
        product.oldPrice = product.price * 2;

        const relatedProducts = await productUtil.get(null, {
            _id: { 
                $ne: id
            }
        }, 5);

        const cartProducts = await cartUtil.getProducts(req.session.cart.id);
        const cartTotals = await cartUtil.getTotals(cartProducts);
    
        const cart = {
            id: req.session.cart.id,
            products: cartProducts,
            total: cartTotals.totalPrice,
            count: cartTotals.totalItems
        }

        res.render('pages/products/productDetail', {product, relatedProducts, cart, canLogout: false});
    } catch(error) {
        throw new Error(error);
    }
}

const renderCart = async (req, res, next) => {
    try {
        const cartProducts = await cartUtil.getProducts(req.session.cart.id);
        const cartTotals = await cartUtil.getTotals(cartProducts);
        const cart = {
            id: req.session.cart.id,
            products: cartProducts,
            total: cartTotals.totalPrice,
            count: cartTotals.totalItems
        };
  
        res.render('pages/products/cart', {cart, canLogout: false});
    } catch(error) {
      throw new Error(error);
    }
}

const renderCheckout = async (req, res, next) => {
    try {
        const cartProducts = await cartUtil.getProducts(req.session.cart.id);
        const cartTotals = await cartUtil.getTotals(cartProducts);
    
        const cart = {
            id: req.session.cart.id,
            products: cartProducts,
            total: cartTotals.totalPrice,
            count: cartTotals.totalItems
        };
    
        const user = req.session.user;
    
        res.render('pages/products/checkout', {cart, user, canLogout: false});
    } catch(error) {
      throw new Error(error);
    }
}

module.exports = {
    renderHome,
    renderProfile,
    renderProductDetail,
    renderCart,
    renderCheckout
}