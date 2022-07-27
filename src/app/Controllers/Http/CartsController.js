
const APITrait = require('../../Utils/Traits/APITrait')
const CartTrait = require('../../Utils/Traits/CartTrait')
const CartsService = require('../../Services/CartsService')
const ProductsService = require('../../Services/ProductsService')
const Product = new ProductsService

class CartsController {
    constructor() {
        this.service = new CartsService
        this.getCarts = this.getCarts.bind(this)
        this.createCart = this.createCart.bind(this)
        this.getCartById = this.getCartById.bind(this)
        this.updateCartById = this.updateCartById.bind(this)
        this.deleteCartById = this.deleteCartById.bind(this)
        this.updateCartProducts = this.updateCartProducts.bind(this)
        this.getCartProducts = this.getCartProducts.bind(this)
        this.addProductToCart = this.addProductToCart.bind(this)
        this.deleteProductFromCart = this.deleteProductFromCart.bind(this)
    }

    async getCarts(req, res, next) {
        try {
            const carts = await this.service.getCarts()
            const data = carts.data
            const length = data.length

            return res.status(200).json({ length, data })
        } catch (error) {
            next(error)
        }
    }

    async getCartById(req, res, next) {
        try {
            const { id } = req.params
    
            const existingCart = await this.service.getCartById(id)
        
            if (!existingCart.success) {
                return res.status(404).json(existingCart)
            }
        
            return res.status(200).json(existingCart.data)
        } catch (error) {
            next(error)
        }
    }

    async createCart(req, res, next) {
        try {
            const { user, processed, products } = req.body
    
            const cart = {
                user,
                products,
                processed
            }
    
            const createdCart = await this.service.createCart(cart)

            if (!createdCart.success) {
                return res.status(404).json(createdCart)
            }
        
            return res.status(200).json({ success: createdCart.success, data: createdCart.data })
        } catch (error) {
            next(error)
        }
    }

    async updateCartById(req, res, next) {
        try {
            const { id } = req.params
            const { user, products, processed } = req.body
            
            const existingCart = await this.service.getCartById(id)
        
            if (!existingCart.success) {
                return res.status(404).json(existingCart)
            }

            const cart = {
                user,
                products,
                processed
            }

            const modifiedCart = await this.service.updateCartById(id, cart)

            if (!modifiedCart.success) {
                return res.status(404).json(modifiedCart)
            }
    
            return res.status(200).json({ success: modifiedCart.success, data: modifiedCart.data })
        } catch (error) {
            next(error)
        }
    }

    async deleteCartById(req, res, next) {
        try {
            const { id } = req.params

            const existingCart = await this.service.getCartById(id)
        
            if (!existingCart.success) {
                return res.status(404).json(existingCart)
            }
          
            const deletedCart = await this.service.deleteCartById(id)

            if (!deletedCart.success) {
                return res.status(404).json(deletedCart)
            }

            await this.service.deleteCartById(id)
          
            return res.status(200).json({ success: deletedCart.success, data: deletedCart.data })
        } catch (error) {
            next(error)
        }
    }

    async updateCartProducts(req, res, next) {
        try {
            const { body: { cartProducts: cartProductsToUpdate } } = req
            const { session: { cart } } = req
            
            const cartExistingProducts = await this.service.getCartProducts(cart.id)

            if (!cartExistingProducts) {
              return res.status(404).json({ success: false, error: 'Carrito no encontrado' })
            }

            const products = cartExistingProducts.data
            
            let updatedCartProducts = []
            
            cartProductsToUpdate.forEach((cartProductToUpdate) => {
                const productIndex = products.findIndex((cartProduct) => cartProduct.product.id == cartProductToUpdate.product.id)
    
                if (productIndex > -1) {
                    updatedCartProducts.push({
                        product: products[productIndex].product.id,
                        quantity: cartProductToUpdate.quantity
                    })
                }
            })
    
            const modifiedCart = await this.service.updateCartById(cart.id, { products: updatedCartProducts })

            if (!modifiedCart.success) {
                return res.status(404).json(modifiedCart)
            }

            const { data: cartProducts } = await this.service.getCartProducts(cart.id);
            const cartTotals = CartTrait.getTotals(cartProducts);

            req.session.cart = {
                id: cart.id,
                products: cartProducts,
                total: cartTotals.totalPrice,
                count: cartTotals.totalItems
            };
    
            return res.status(200).json({ success: modifiedCart.success, data: modifiedCart.data })
        } catch (error) {
            next(error)
        }
    }

    async getCartProducts(req, res, next) {
        try {
            let { id } = req.params
    
            if (!id || id == 'null') {
                id = req.session.cart._id
            }
            
            const cartProducts = await this.service.getCartProducts(id)
        
            if (!cartProducts) {
              return res.status(404).json({ success: false, error: 'Carrito no encontrado' })
            }
        
            return res.status(200).json({ success: true, data: cartProducts })
        } catch (error) {
            next(error)
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const { params: { id }, body: { productId, quantity } } = req
    
            const existingCart = await this.service.getCartById(id)
    
            if (!existingCart) {
                return res.status(404).json({ success: false, error: 'Carrito no encontrado' })
            }
    
            const existingProduct = await Product.getProductById(productId)
    
            if (!existingProduct) {
                return res.status(404).json({ success: false, error: 'Producto no encontrado' })
            }

            const { data: cart } = existingCart
    
            let products = cart.products
    
            const cartProductIndex = products.findIndex((product) => product.product == productId)
    
            if (cartProductIndex > -1) {
                products[cartProductIndex].quantity += +quantity
            } else {
                products.push({
                    product: productId,
                    quantity: quantity
                })
            }
          
            const modifiedCart = await this.service.updateCartById(id, { products: products })

            if (!modifiedCart.success) {
                return res.status(404).json(modifiedCart)
            }

            const { data: cartProducts } = await this.service.getCartProducts(id);
            const cartTotals = CartTrait.getTotals(cartProducts);

            req.session.cart = {
                id: id,
                products: cartProducts,
                total: cartTotals.totalPrice,
                count: cartTotals.totalItems
            };
    
            return res.status(200).json({ success: modifiedCart.success, data: modifiedCart.data })
        } catch (error) {
            next(error)
        }
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const { cartId, productId } = req.params
    
            const existingCart = await this.service.getCartById(cartId)
    
            if (!existingCart) {
            return res.status(404).json({ success: false, error: 'Carrito no encontrado' })
            }
    
            const existingProduct = await Product.getProductById(productId)
    
            if (!existingProduct) {
                return res.status(404).json({ success: false, error: 'Producto no encontrado' })
            }
    
            let products = existingCart.products
    
            const cartProductIndex = existingCart.products.findIndex((id) => id == productId)
    
            if(cartProductIndex > -1) {
                products.splice(cartProductIndex, 1)
            }
    
            const modifiedCart = await this.service.updateCartById(cartId, { products: products })
    
            if (!modifiedCart.success) {
                return res.status(404).json(modifiedCart)
            }

            const { data: cartProducts } = await this.service.getCartProducts(cartId);
            const cartTotals = CartTrait.getTotals(cartProducts);

            req.session.cart = {
                id: cartId,
                products: cartProducts,
                total: cartTotals.totalPrice,
                count: cartTotals.totalItems
            };
    
            return res.status(200).json({ success: modifiedCart.success, data: modifiedCart.data })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CartsController