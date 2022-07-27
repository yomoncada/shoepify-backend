const ProductsRepository = require('../Repositories/ProductsRepository')
class ProductsService {
    constructor() {
        this.repository = new ProductsRepository
    }

    async getProducts() {
        try {
            const products = await this.repository.getAll() 
            return {success: true, message: 'Productos obtenidos exitosamente.', data: products}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async getRelatedProducts(id) {
        try {
            const products = await this.repository.getRelated(id) 
            return {success: true, message: 'Productos relacionados obtenidos exitosamente.', data: products}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
    
    async getProductById(id) {
        try {
            const existingProduct = await this.repository.get(id)

            if (!existingProduct) {
                return {success: false, message: 'Producto inexistente.'}
            }

            return {success: true, message: 'Producto obtenido exitosamente.', data: existingProduct}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async createProduct(product) {
        try {

            if (!product.name || !product.description || !product.code || !product.thumbnail || !product.price || !product.stock ) {
                return {success: false, message: 'Cuerpo del producto incompleto.'}
            }

            const productCreation = await this.repository.create(product)

            if (!productCreation._id) {
                return {success: false, message: productCreation}
            }

            return {success: true, message: 'Producto creado exitosamente.', data: productCreation}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async updateProductById(id, product) {
        try {
            if (!product.name && !product.description && !product.code && !product.thumbnail && !product.price && !product.stock) {
                return {success: false, message: 'Cuerpo del producto incompleto.'}
            }

            const productUpdate = await this.repository.update(id, product)

            if (!productUpdate.acknowledged) {
                return {success: false, message: productUpdate}
            }

            return {success: true, message: 'Producto actualizado exitosamente.', data: productUpdate}
        } catch (error) {
            return {success: false, message: error.product}
        }
    }

    async deleteProductById(id) {
        try {
            const productDelete = await this.repository.delete(id)

            if (!productDelete.acknowledged) {
                return {success: false, message: productDelete}
            }

            return {success: true, message: 'Producto eliminado exitosamente.', data: productDelete}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async decreaseProduct(id, quantity) {
        try {
            const product = await productContainer.get(id);
    
            if (product) {
                const newStock = product.stock - quantity;

                const updatedProduct = await productContainer.update(id, {stock: newStock});

                return updatedProduct;
            }

            return true;
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = ProductsService