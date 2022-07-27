
const APITrait = require('../../Utils/Traits/APITrait')
const ProductsService = require('../../Services/ProductsService')

class ProductsController {
    constructor() {
        this.service = new ProductsService
        this.getProducts = this.getProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.updateProductById = this.updateProductById.bind(this)
        this.deleteProductById = this.deleteProductById.bind(this)
    }

    async getProducts(req, res, next) {
        try {
            const products = await this.service.getProducts()
            const data = products.data
            const length = data.length

            return res.status(200).json({ length, data })
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params
    
            const existingProduct = await this.service.getProductById(id)
        
            if (!existingProduct.success) {
                return res.status(404).json(existingProduct)
            }
        
            return res.status(200).json(existingProduct.data)
        } catch (error) {
            next(error)
        }
    }

    async createProduct(req, res, next) {
        try {
            const { name, description, code, thumbnail, price, stock } = req.body
    
            const product = {
                name,
                description,
                code,
                thumbnail,
                price,
                stock
            }
    
            const createdProduct = await this.service.createProduct(product)

            if (!createdProduct.success) {
                return res.status(404).json(createdProduct)
            }
        
            return res.status(200).json({ success: createdProduct.success, data: createdProduct.data })
        } catch (error) {
            next(error)
        }
    }
    
    async updateProductById(req, res, next) {
        try {
            const { id } = req.params
            const { name, description, code, thumbnail, price, stock } = req.body
            
            const existingProduct = await this.service.getProductById(id)
        
            if (!existingProduct.success) {
                return res.status(404).json(existingProduct)
            }

            const product = {
                name,
                description,
                code,
                thumbnail,
                price,
                stock
            }
            
            const modifiedProduct = await this.service.updateProductById(id, product)

            if (!modifiedProduct.success) {
                return res.status(404).json(modifiedProduct)
            }
    
            return res.status(200).json({ success: modifiedProduct.success, data: modifiedProduct.data })
        } catch (error) {
            next(error)
        }
    }

    async deleteProductById(req, res, next) {
        try {
            const { id } = req.params

            const existingProduct = await this.service.getProductById(id)
        
            if (!existingProduct.success) {
                return res.status(404).json(existingProduct)
            }
          
            const deletedProduct = await this.service.deleteProductById(id)

            if (!deletedProduct.success) {
                return res.status(404).json(deletedProduct)
            }

            await this.service.deleteProductById(id)
          
            return res.status(200).json({ success: deletedProduct.success, data: deletedProduct.data })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductsController