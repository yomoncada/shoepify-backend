const express = require('express');
const router = express.Router();

const productUtil = require('../../utils/product.utils');

router.get('/product/:id/card', async (req, res, next) => {
  const { id } = req.params;
  const product = await productUtil.get(id);

  res.render('layouts/products/card', {product});
});

router.get('/product/:id/row', async (req, res, next) => {
  const { id } = req.params;
  const product = await productUtil.get(id);

  res.render('layouts/products/row', {product});
});

module.exports = router;