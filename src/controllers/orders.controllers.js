const { OrdersDao, CartsDao, ProductsDao } = require('../model/daos/index');
const cartUtil = require('../utils/cart.utils');
const orderContainer = new OrdersDao;

const createOrder = async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        const createdCart = await cartUtil.create(userId);
        
        return res.json({ success: true, data: createdCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createOrder
}