const express = require('express');

const Product = require('../../model/Product')

const productApi = new Product('./src/data/products.json');

const user = {
  isAdmin: true
};

const isAdmin = (req, res, next) => {
  if(user.isAdmin){
      next();
  } else {
      res.status(403).json({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`});  
  }
};

const router = express.Router();

router.get('/', async (req, res) => {
  return res.status(200).json({ success: true, result: await productApi.getAll() });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isInteger(+id)) {
    const existingProduct = await productApi.get(id);

    if (!existingProduct) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    return res.status(200).json({ success: true, result: existingProduct });
  } else {
    return res.status(400).json({success: false, error: 'Por favor, ingrese un id válido'});
  }
});

router.post('/', isAdmin, async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

  if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
    return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
  }

  const createdProduct = await productApi.add(product);

  return res.json({ success: true, result: createdProduct });
});

router.put('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

  const product = {
    id,
    nombre,
    descripcion,
    codigo,
    foto,
    precio
  }

  const existingProduct = await productApi.get(id);

  if (!existingProduct) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }

  if ( !nombre || !descripcion || !codigo || !foto || !precio || !stock ) {
    return res.status(400).json({ succes: false, error: 'Formato del cuerpo incorrecto' });
  }

  const modifiedProduct = await productApi.edit(product);

  return res.json({ success: true, result: modifiedProduct});
});

router.delete('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const existingProduct = await productApi.get(id);

  if (!existingProduct) {
    return res.status(404).json({ success: false, error: 'Producto no encontrado' });
  }

  await productApi.delete(id);

  return res.json({ success: true, result: 'Producto eliminado' });
});

module.exports = router;