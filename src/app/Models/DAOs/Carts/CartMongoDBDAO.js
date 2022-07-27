const MongoDBContainer = require("../../Containers/MongoDBContainer");
const CartSchema = require('../../Schemas/CartSchema');

class CartMongoDBDAO extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!CartMongoDBDAO.instance) {
            super('carts', CartSchema);
            CartMongoDBDAO.instance = this;
            return this;
        } else {
            return CartMongoDBDAO.instance;
        }
    }

    async getAll(conditions = {}, select = { __v: 0 }) {
        try {
            return await this.model
                .find(conditions, select)
                .populate('user', { password: 0, __v: 0 })
                .populate('products')
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async get(id, select = { __v: 0 }) {
        try {
            return await this.model
                .findById(id, select)
                .populate('user', { password: 0, __v: 0 })
                .populate('products')
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getByUser(user, select = { __v: 0 }) {
        try {
            return await this.model
                .findOne({ user, processed: false }, select)
                .populate('user', { password: 0, __v: 0 })
                .populate('products')
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProducts(_id, select = { __v: 0 }) {
        try {
            const cart = await this.model
                .findOne({ _id }, select)
                .populate('user', { password: 0, __v: 0 })
                .populate('products')
                .lean()

            return cart.products
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = CartMongoDBDAO;