const OrdersRepository = require('../Repositories/OrdersRepository')
class OrdersService {
    constructor() {
        this.repository = new OrdersRepository
    }

    async createOrder(order) {
        try {
            if (!order.user || !order.cart) {
                return {success: false, message: 'Cuerpo de la orden incompleto.'}
            }

            const orderCreation = await this.repository.create(order)

            if (!orderCreation._id) {
                return {success: false, message: orderCreation}
            }

            return {success: true, message: 'Orden creada exitosamente.', data: orderCreation}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = OrdersService