const productUtil = require('../utils/product.utils');
const cartUtil = require('../utils/cart.utils');
const orderUtil = require('../utils/order.utils');

const createOrder = async (req, res, next) => {
    try {
        const { user, cart } = req.session;

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