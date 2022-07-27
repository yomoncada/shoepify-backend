
const CartTrait = require('../../Utils/Traits/CartTrait')
const EmailTrait = require('../../Utils/Traits/EmailTrait')
const WhatsAppTrait = require('../../Utils/Traits/WhatsAppTrait')
const ProductsService = require('../../Services/ProductsService')
const CartsService = require('../../Services/CartsService')
const OrdersService = require('../../Services/OrdersService')
const Product = new ProductsService
const Cart = new CartsService

class OrdersController {
    constructor() {
        this.service = new OrdersService
        this.createOrder = this.createOrder.bind(this)
    }

    async createOrder(req, res, next) {
        try {
            let { user, cart } = req.session;
    
            let existingCart = await Cart.getCartById(cart.id);
    
            if (existingCart.success) {
                const order = {
                    user: user.id,
                    cart: cart.id
                }
                
                const createdOrder = await this.service.createOrder(order);
    
                existingCart = existingCart.data
                
                if (createdOrder.success) {
                    const productPromises = existingCart.products.map(async (product) => {
                        const decreasedProduct = await Product.decreaseProduct(product.id, product.quantity);
                        
                        return decreasedProduct;
                    });
    
                    await Promise.all(productPromises);
    
                    const processedOrder = await Cart.processCart(cart.id);
                    
                    if (processedOrder.success) {
                        const {data: cartProducts } = await Cart.getCartProducts(req.session.cart.id);
                        const cartTotals = CartTrait.getTotals(cartProducts);
                    
                        cart = {
                            id: req.session.cart.id,
                            products: cartProducts,
                            total: cartTotals.totalPrice,
                            count: cartTotals.totalItems
                        };
                    
                        await EmailTrait.send('order', {user, cart});
                        await WhatsAppTrait.send('order', {user, cart});
    
                        return res.status(200).json({ success: true, data: createdOrder });
                    } else {
                        return res.status(422).json({ success: false, error: {} });
                    }
                } else {
                    return res.status(422).json({ success: false, error: {} });
                }
            } else {
                return res.status(422).json({ success: false, error: {} });
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrdersController