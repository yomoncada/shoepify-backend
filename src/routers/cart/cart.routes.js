const express = require('express');

const Cart = require('../../model/Cart')
const Product = require('../../model/Product')

const cartApi = new Cart('./src/data/carts.json');
const productApi = new Product('./src/data/products.json');

const router = express.Router();

router.post('/', async (req, res) => {
  const createdCart = await cartApi.add();

  return res.json({ success: true, result: createdCart });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const existingCart = await cartApi.get(id);

    if (!existingCart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
    }

    await cartApi.delete(id);

    return res.json({ success: true, result: 'Carrito eliminado' });
});
  
router.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
  
    if (Number.isInteger(+id)) {
      const existingCart = await cartApi.get(id);
  
      if (!existingCart) {
        return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
      }
  
      return res.status(200).json({ success: true, result: existingCart });
    } else {
      return res.status(400).json({success: false, error: 'Por favor, ingrese un id válido'});
    }
});

router.post('/:id/productos/', async (req, res) => {
    const { params: { id }, body: { productId } } = req;

    if (Number.isInteger(+id) && Number.isInteger(+productId)) {
        const existingCart = await cartApi.get(id);
    
        if (!existingCart) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productApi.get(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const modifiedCart = await cartApi.addProduct(id, existingProduct);
    
        return res.status(200).json({ success: true, result: modifiedCart });
    } else {
        return res.status(400).json({success: false, error: 'Por favor, ingrese un id válido'});
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;

    if (Number.isInteger(+id)) {
        const existingCart = await cartApi.get(id);
    
        if (!existingCart) {
          return res.status(404).json({ success: false, error: 'Carrito no encontrado' });
        }

        const existingProduct = await productApi.get(id_prod);

        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        const modifiedCart = await cartApi.deleteProduct(id, id_prod);
    
        return res.status(200).json({ success: true, result: modifiedCart });
    } else {
        return res.status(400).json({success: false, error: 'Por favor, ingrese un id válido'});
    }
});

module.exports = router;