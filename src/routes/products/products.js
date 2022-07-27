const { Router } = require('express');
const ProductsController = require('../../app/Controllers/Http/ProductsController');

const router = new Router();

class ProductsRoutes {
	constructor() {
		this.controller = new ProductsController();
	}

  	initialize(prefix = "") {
		router.route(`${prefix}/`)
			.get(this.controller.getProducts)
			.post(this.controller.createProduct);

		router.route(`${prefix}/:id`)
			.get(this.controller.getProductById)
			.put(this.controller.updateProductById)
			.delete(this.controller.deleteProductById);

		return router;
	}
}

module.exports = new ProductsRoutes();