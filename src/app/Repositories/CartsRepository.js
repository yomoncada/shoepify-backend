const appConfig = require('../../config/app')

const UserDTO = require('../Models/DTOs/UserDTO')
const CartDTO = require('../Models/DTOs/CartDTO')
const ProductDTO = require('../Models/DTOs/ProductDTO')
const DAOSFactory = require('../Models/DAOs/Factory')

class CartsRepository {
    constructor() {
        this.DAO = DAOSFactory.getDAOS(appConfig.env.pers).CartDAO
    }

    async getAll(conditions = {}) {
        try {
            const carts = await this.DAO.getAll(conditions)

            return carts.map(cart => {
                cart.user = new UserDTO(cart.user, cart.user._id)
                return new CartDTO(cart, cart._id)
            })
        } catch (error) {
            return []
        }
    }

    async get(id) {
        try {
            let cart = await this.DAO.get(id)
            cart.user = new UserDTO(cart.user, cart.user._id)

            return new CartDTO(cart, cart._id)
        } catch (error) {
            return null
        }
    }

    async getByUser(userId) {
        try {
            const cart = await this.DAO.getByUser(userId)
            cart.user = new UserDTO(cart.user, cart.user._id)

            return new CartDTO(cart, cart._id)
        } catch (error) {
            return null
        }
    }

    async getProducts(id) {
        try {
            return await this.DAO.getProducts(id)
        } catch (error) {
            return null
        }
    }

    async create(cart) {
        try {
            const dto = new CartDTO(cart)

            return await this.DAO.create(dto)
        } catch (error) {
            return error.message
        }
    }

    async update(id, cart) {
        try {
            const dto = new CartDTO(cart)
            
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

module.exports = CartsRepository