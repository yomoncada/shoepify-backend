const appConfig = require('../../config/app')

const OrderDTO = require('../Models/DTOs/OrderDTO')
const DAOSFactory = require('../Models/DAOs/Factory')

class OrdersRepository {
    constructor() {
        this.DAO = DAOSFactory.getDAOS(appConfig.env.pers).OrderDAO
    }

    async getAll(conditions = {}) {
        try {
            const orders = await this.DAO.getAll(conditions)
            return orders.map(order => new OrderDTO(order, order._id))
        } catch (error) {
            return []
        }
    }

    async get(id) {
        try {
            const order = await this.DAO.get(id)
            return new OrderDTO(order, order._id)
        } catch (error) {
            return null
        }
    }

    async create(order) {
        try {
            const dto = new OrderDTO(order)
            return await this.DAO.create(dto)
        } catch (error) {
            return error.message
        }
    }

    async update(id, order) {
        try {
            const dto = new OrderDTO(order)
            return await this.DAO.update(id, dto)
        } catch (error) {
            return error.message
        }
    }

    async delete(id) {
        try {
            return await this.DAO.delete(id)
        } catch (error) {
            return error.message
        }
    }
}

module.exports = OrdersRepository