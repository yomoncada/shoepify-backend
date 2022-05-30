const productUtil = require('../utils/product.utils');
const cartUtil = require('../utils/cart.utils');
const orderUtil = require('../utils/order.utils');
const mailUtil = require('../utils/mail.utils');
const whatsappUtil = require('../utils/whatsapp.utils');

const createOrder = async (req, res, next) => {
    try {
        let { user, cart } = req.session;

        const existingCart = await cartUtil.get(cart.id);

        if (existingCart) {
            const createdOrder = await orderUtil.create(user.id, cart.id);

            if (createdOrder) {
                const productPromises = existingCart.products.map(async (product) => {
                    const decreasedProduct = await productUtil.decrease(product.id, product.quantity);
                    
                    return decreasedProduct;
                });

                const decreasedProducts = await Promise.all(productPromises);

                const processedOrder = await cartUtil.process(cart.id);
                
                if (processedOrder) {
                    const cartProducts = await cartUtil.getProducts(req.session.cart.id);
                    const cartTotals = await cartUtil.getTotals(cartProducts);
                
                    cart = {
                        id: req.session.cart.id,
                        products: cartProducts,
                        total: cartTotals.totalPrice,
                        count: cartTotals.totalItems
                    };
                
                    await mailUtil.send('order', {user, cart});
                    await whatsappUtil.send('order', {user, cart});

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
        throw new Error(error.message);
    }
}

module.exports = {
    createOrder
}