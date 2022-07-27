const CartsRepository = require('../Repositories/CartsRepository')
const ProductsRepository = require('../Repositories/ProductsRepository')
const Product = new ProductsRepository

class CartsService {
    constructor() {
        this.repository = new CartsRepository
    }

    async getCarts() {
        try {
            const carts = await this.repository.getAll() 
            return {success: true, message: 'Carritos obtenidos exitosamente.', data: carts}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async getCartById(id) {
        try {
            const existingCart = await this.repository.get(id)

            if (!existingCart) {
                return {success: false, message: 'Carrito inexistente.'}
            }

            return {success: true, message: 'Carrito obtenido exitosamente.', data: existingCart}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async getCartByUser(userId) {
        try {
            const existingCart = await this.repository.getByUser(userId)

            if (!existingCart) {
                return {success: false, message: 'Carrito inexistente.'}
            }

            return {success: true, message: 'Carrito obtenido exitosamente.', data: existingCart}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async getCartProducts(id) {
        try {
            const existingCart = await this.repository.get(id);
            
            let cartProducts = [];
    
            if (existingCart) {
                const productPromises = existingCart.products.map(async (product) => {
                    const cartProduct = {
                        product: await Product.get(product.product),
                        quantity: product.quantity
                    };
    
                    return cartProduct;
                });
    
                cartProducts = await Promise.all(productPromises);
            }

            return {success: true, message: 'Productos del carrito obtenidos exitosamente.', data: cartProducts}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async createCart(cart) {
        try {
            if (!cart.user) {
                return {success: false, message: 'Cuerpo del mensaje incompleto.'}
            }

            const cartCreation = await this.repository.create(cart)

            if (!cartCreation._id) {
                return {success: false, message: cartCreation}
            }

            return {success: true, message: 'Carrito creado exitosamente.', data: cartCreation}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
    
    async updateCartById(id, cart) {
        try {
            if (!cart.cart && !cart.products && !cart.processed) {
                return {success: false, message: 'Cuerpo del carrito incompleto.'}
            }

            const cartUpdate = await this.repository.update(id, cart)

            if (!cartUpdate.acknowledged) {
                return {success: false, message: cartUpdate}
            }

            return {success: true, message: 'Carrito actualizado exitosamente.', data: cartUpdate}
        } catch (error) {
            return {success: false, message: error.cart}
        }
    }

    async deleteCartById(id) {
        try {
            const cartDelete = await this.repository.delete(id)

            if (!cartDelete.acknowledged) {
                return {success: false, message: cartDelete}
            }

            return {success: true, message: 'Carrito eliminado exitosamente.', data: cartDelete}
        } catch (error) {
            return {success: false, message: error.user}
        }
    }

    async processCart(id) {
        try {
            const existingCart = await this.repository.get(id);
    
            if (!existingCart) {
                return {success: false, message: 'Carrito inexistente.'}
            }
            
            const cartUpdate = await this.repository.update(id, { processed: true })

            if (!cartUpdate.acknowledged) {
                return {success: false, message: cartUpdate}
            }

            return {success: true, message: 'Carrito procesado exitosamente.', data: cartUpdate}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}

module.exports = CartsService