const { ProductsDao } = require('../model/daos/index');
const productContainer = new ProductsDao;

const get = async (id = null, conditions = {}, limit = null) => {
    try {
        let products = [];

        if (!id) {
            products = await productContainer.getAll(conditions, limit);
        } else {
            products = await productContainer.get(id);
        }

        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}

const create = async (product) => {
    try {
        return await productContainer.create(product);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    get,
    create
}