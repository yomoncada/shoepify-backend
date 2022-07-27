const appConfig = require('../../config/app')

const ProductDTO = require('../Models/DTOs/ProductDTO')
const DAOSFactory = require('../Models/DAOs/Factory')

class ProductsRepository {
    constructor() {
        this.DAO = DAOSFactory.getDAOS(appConfig.env.pers).ProductDAO
    }

    async getAll(conditions = {}, limit = null) {
        try {
            const products = await this.DAO.getAll(conditions, limit)
            return products.map(product => new ProductDTO(product, product._id))
        } catch (error) {
            return []
        }
    }

    async getRelated(id) {
        try {
            const products = await this.DAO.getRelated(id)
            return products.map(product => new ProductDTO(product, product._id))
        } catch (error) {
            return []
        }
    }

    async get(id) {
        try {
            const product = await this.DAO.get(id)
            return new ProductDTO(product, product._id)
        } catch (error) {
            return null
        }
    }

    async create(product) {
        try {
            const dto = new ProductDTO(product)
            return await this.DAO.create(dto)
        } catch (error) {
            return error.message
        }
    }

    async update(id, product) {
        try {
            const dto = new ProductDTO(product)
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

module.exports = ProductsRepository