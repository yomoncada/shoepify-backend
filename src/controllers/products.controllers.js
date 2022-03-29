const { Product } = require('../model/daos/index');
const productApi = new Product;

const getAllProducts = async (req, res, next) => {
    try {
        return res.status(200).json({ success: true, result: await productApi.getAll() });
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingProduct = await productApi.get(id);
    
        if (!existingProduct) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
    
        return res.status(200).json({ success: true, result: existingProduct });
    } catch (error) {
        throw new Error(error.message);
    }
}

const createProduct = async (req, res, next) => {
    try {
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

        const createdProduct = await productApi.create(product);

        return res.json({ success: true, result: createdProduct });
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

        const existingProduct = await productApi.get(id);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const modifiedProduct = await productApi.update(id, product);

        return res.json({ success: true, result: modifiedProduct});
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingProduct = await productApi.get(id);
      
        if (!existingProduct) {
          return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
      
        await productApi.delete(id);
      
        return res.json({ success: true, result: 'Producto eliminado' });
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
