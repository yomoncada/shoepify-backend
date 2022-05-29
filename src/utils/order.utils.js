const { OrdersDao } = require('../model/daos/index');
const orderContainer = new OrdersDao;

const create = async (userId, cartId) => {
    try {
        const order = {
            user: userId,
            cart: cartId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await orderContainer.create(order);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    create
}