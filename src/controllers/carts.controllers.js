const { Cart, Product } = require('../model/daos/index');
const cartApi = new Cart;
const productApi = new Product;

const createCart = async (req, res, next) => {
    try {
        let cart = {
            timestamp: Date.now(),
            products: []
        };
    
        const createdCart = await cartApi.create(cart);
    
        return res.json({ success: true, result: createdCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingCart = await cartApi.get(id);
    
        if (!existingCart) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }
    
        await cartApi.delete(id);
    
        return res.json({ success: true, result: 'Carrito eliminado' });
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCartProducts = async (req, res, next) => {
    try {
        const { id } = req.params;
  
        const existingCart = await cartApi.get(id);
    
        if (!existingCart) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }
    
        return res.status(200).json({ success: true, result: existingCart.products });
    } catch (error) {
        throw new Error(error.message);
    }
}

const addProductToCart = async (req, res, next) => {
    try {
        const { params: { id }, body: { productId } } = req;

        const existingCart = await cartApi.get(id);

        if (!existingCart) {
            return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productApi.get(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const products = existingCart.products;
      
        products.push(existingProduct.id);
      
        const modifiedCart = await cartApi.update(id, { products: products });
      
        return res.status(200).json({ success: true, result: modifiedCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;

        const existingCart = await cartApi.get(cartId);

        if (!existingCart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productApi.get(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const products = existingCart.products;

        const cartProductIndex = existingCart.products.findIndex((id) => id == productId);

        if(cartProductIndex > -1) {
            existingCart.products.splice(cartProductIndex, 1);
        }

        const modifiedCart = await cartApi.update(cartId, { products: products });

        return res.status(200).json({ success: true, result: modifiedCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCartProducts,
    addProductToCart,
    deleteProductFromCart
}