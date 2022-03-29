const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
} = require('../../controllers/products.controllers');

const user = {
  isAdmin: true
};

const isAdmin = (req, res, next) => {
  if(user.isAdmin){
      next();
  } else {
      res.status(403).json({error: -1, description: `ruta ${req.originalUrl} método ${req.method} no autorizada`});  
  }
};

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', isAdmin, createProduct);
router.put('/:id', isAdmin, updateProductById);
router.delete('/:id', isAdmin, deleteProductById);

module.exports = router;