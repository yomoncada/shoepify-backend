const CartTrait = require('../../Utils/Traits/CartTrait')
const CartsService = require('../../Services/CartsService')
const ProductsService = require('../../Services/ProductsService')
const Cart = new CartsService
const Product = new ProductsService

class WebController {
    constructor() {
        this.service = new Object
        this.renderHome = this.renderHome.bind(this)
        this.renderProfile = this.renderProfile.bind(this)
        this.renderProductDetail = this.renderProductDetail.bind(this)
        this.renderProductDetail = this.renderProductDetail.bind(this)
        this.renderCart = this.renderCart.bind(this)
        this.renderCheckout = this.renderCheckout.bind(this)
    }

    async renderHome(req, res, next) {
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
                
                let cart = await Cart.getCartByUser(session.user.id);

                if (!cart.success) {
                    cart = {
                        user: session.user.id
                    }

                    cart = await Cart.createCart(cart);
                }

                cart = cart.data
        
                const { data: cartProducts } = await Cart.getCartProducts(cart.id);
                const cartTotals = CartTrait.getTotals(cartProducts);

                session.cart = {
                    id: cart.id,
                    products: cartProducts,
                    total: cartTotals.totalPrice,
                    count: cartTotals.totalItems
                };
            }
        
            const { data: products } = await Product.getProducts();
        
            res.render('pages/index', {products, cart: req.session.cart, canLogout: false});
        } catch(error) {
            next(error)
        }
    }

    async renderProfile(req, res, next) {
        try {
            const user = req.session.user;
            const cart = req.session.cart
    
            res.render('pages/user/profile', {cart, user, canLogout: true});
        } catch(error) {
            next(error)
        }
    }

    async renderProductDetail(req, res, next) {
        try {
            const { id } = req.params;
    
            let { data: product } = await Product.getProductById(id);

            product.oldPrice = product.price * 2;
    
            const { data: relatedProducts } = await Product.getRelatedProducts(id)
    
            const cart = req.session.cart

            res.render('pages/products/productDetail', {product, relatedProducts, cart, canLogout: false});
        } catch(error) {
            next(error)
        }
    }

    async renderCart(req, res, next) {
        try {
            const cart = req.session.cart;
      
            res.render('pages/products/cart', {cart, canLogout: false});
        } catch(error) {
            next(error)
        }
    }

    async renderCheckout(req, res, next) {
        try {
            const cart = req.session.cart;
            const user = req.session.user;
        
            res.render('pages/products/checkout', {cart, user, canLogout: false});
        } catch(error) {
            next(error)
        }
    }
}

module.exports = WebController