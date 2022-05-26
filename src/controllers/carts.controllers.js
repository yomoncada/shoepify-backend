const { CartsDao, ProductsDao } = require('../model/daos/index');
const cartUtil = require('../utils/cart.utils');
const cartContainer = new CartsDao;
const productContainer = new ProductsDao;


const createCart = async (req, res, next) => {
    try {
        const userId = req.session.user.id;
        const createdCart = await cartUtil.create(userId);
        
        return res.json({ success: true, data: createdCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCart = async (req, res, next) => {
    try {
        const session = req.session;
        const userId = session.user.id;

        let cart = await cartUtil.getByUser(userId);

        if (!cart) {
            let cart = await cartUtil.create(userId);

            return res.json({ success: true, data: cart});
        }

        session.cart = cart;

        return res.json({ success: true, data: cart});
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingCart = await cartContainer.get(id);
    
        if (!existingCart) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }
    
        await cartContainer.delete(id);
    
        return res.json({ success: true, message: 'Carrito eliminado' });
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateCartProducts = async (req, res, next) => {
    try {
        const { fields: { products } } = req;


        return res.status(200).json({ success: true, data: products });
        /* let { id } = req.params;

        if (!id || id == 'null') {
            id = req.session.cart['_id']
        }
        
        const cartProducts = await cartUtil.getProducts(id);
    
        if (!cartProducts) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }
    
        return res.status(200).json({ success: true, data: cartProducts }); */
    } catch (error) {
        throw new Error(error.message);
    }
}

const getCartProducts = async (req, res, next) => {
    try {
        let { id } = req.params;

        if (!id || id == 'null') {
            id = req.session.cart['_id']
        }
        
        const cartProducts = await cartUtil.getProducts(id);
    
        if (!cartProducts) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }
    
        return res.status(200).json({ success: true, data: cartProducts });
    } catch (error) {
        throw new Error(error.message);
    }
}

const addProductToCart = async (req, res, next) => {
    try {
        const { params: { id }, fields: { productId, quantity } } = req;


        const existingCart = await cartContainer.get(id);

        if (!existingCart) {
            return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productContainer.get(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const products = existingCart.products;

        for (var i=0; i<quantity; i++) {
            products.push(existingProduct.id);
        }

        products.push(existingProduct.id);
      
        const modifiedCart = await cartContainer.update(id, { products: products });
      
        return res.status(200).json({ success: true, data: modifiedCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;

        const existingCart = await cartContainer.get(cartId);

        if (!existingCart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productContainer.get(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const products = existingCart.products;

        const cartProductIndex = existingCart.products.findIndex((id) => id == productId);

        if(cartProductIndex > -1) {
            existingCart.products.splice(cartProductIndex, 1);
        }

        const modifiedCart = await cartContainer.update(cartId, { products: products });

        return res.status(200).json({ success: true, data: modifiedCart });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getCart,
    createCart,
    deleteCart,
    getCartProducts,
    updateCartProducts,
    addProductToCart,
    deleteProductFromCart
}