const { ProductsDao } = require('../model/daos/index');
const productUtil = require('../utils/product.utils');
const productContainer = new ProductsDao;

const getAllProducts = async (req, res, next) => {
    try {
        return res.status(200).json({ success: true, data: await productUtil.get() });
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingProduct = await productUtil.get(id);
    
        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
    
        return res.status(200).json({ success: true, data: existingProduct });
    } catch (error) {
        throw new Error(error.message);
    }
}

const createProduct = async (req, res, next) => {
    try {
        console.log('createProduct');
        console.log(req.body);
        console.log(req.fields);
        console.log(req.field);
        const { name, description, code, thumbnail, price, stock } = req.body;

        if ( !name || !description || !code || !thumbnail || !price || !stock ) {
            return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
        }

        const product = {
            name,
            description,
            code,
            thumbnail,
            price,
            stock
        }

        const createdProduct = await productUtil.create(product);

        return res.json({ success: true, data: createdProduct });
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, code, thumbnail, price, stock } = req.body;

        if ( !name || !description || !code || !thumbnail || !price || !stock ) {
            return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
        }

        const product = {
            name,
            description,
            code,
            thumbnail,
            price,
            stock
        }

        const existingProduct = await productContainer.get(id);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const modifiedProduct = await productContainer.update(id, product);

        return res.json({ success: true, data: modifiedProduct});
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingProduct = await productContainer.get(id);
      
        if (!existingProduct) {
          return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
      
        await productContainer.delete(id);
      
        return res.json({ success: true, data: 'Producto eliminado' });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}
