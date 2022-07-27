const MongoDBContainer = require("../../Containers/MongoDBContainer");
const ProductSchema = require('../../Schemas/ProductSchema');

class ProductMongoDBDAO extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!ProductMongoDBDAO.instance) {
            super('products', ProductSchema);
            ProductMongoDBDAO.instance = this;
            return this;
        } else {
            return ProductMongoDBDAO.instance;
        }
    }

    async get(id) {
        try {
            return await this.model
                .findById(id, { __v: 0 })
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getRelated(id) {
        try {
            return await this.model
                .find({ _id: { $ne: id } }, { __v: 0 })
                .limit(5)
                .lean()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = ProductMongoDBDAO;