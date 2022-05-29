const { CartsDao, ProductsDao } = require('../model/daos/index');
const cartContainer = new CartsDao;
const productContainer = new ProductsDao;

const get = async (id) => {
    try {
        return await cartContainer.get(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getByUser = async (userId) => {
    try {
        return await cartContainer.getByUser(userId);
    } catch (error) {
        throw new Error(error.message);
    }
}

const create = async (userId) => {
    try {
        const cart = {
            user: userId,
            products: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return await cartContainer.create(cart);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProducts = async (id) => {
    try {
        const existingCart = await cartContainer.get(id);

        if (!existingCart) {
            return [];
        } else {
            const productPromises = existingCart.products.map(async (product) => {
                const cartProduct = {
                    product: await productContainer.get(product.id),
                    quantity: product.quantity
                };

                return cartProduct;
            });

            const cartProducts = await Promise.all(productPromises);

            return cartProducts;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTotals = async (cartProducts) => {
    try {
        let totalPrice = 0;
        let totalItems = 0;

        cartProducts.forEach((cartProduct) => {
            totalPrice += cartProduct.product.price * cartProduct.quantity;
            totalItems += cartProduct.quantity;
        });

        return {
            totalPrice,
            totalItems
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

const process = async (id) => {
    try {
        const existingCart = await cartContainer.get(id);

        if (!existingCart) {
            return null;
        } else {

            return await cartContainer.update(id, {processed: true});
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    get,
    getByUser,
    create,
    getProducts,
    getTotals,
    process
}