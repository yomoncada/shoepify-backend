const { CartsDao, ProductsDao } = require('../model/daos/index');
const cartContainer = new CartsDao;
const productContainer = new ProductsDao;

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
            const productPromises = existingCart.products.map(async (productId) => (
                await productContainer.get(productId)
            ));

            const cartProducts = await Promise.all(productPromises);

            return cartProducts;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getTotal = async (cartProducts) => {
    try {
        let total = 0;

        cartProducts.forEach((product) => {
            total += product.price
        });

        return total;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getByUser,
    create,
    getProducts,
    getTotal
}