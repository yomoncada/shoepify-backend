const { Router } = require('express')
const CartsController = require('../../app/Controllers/Http/CartsController')

const router = new Router()

class CartsRoutes {
	constructor() {
		this.controller = new CartsController()
	}

  	initialize(prefix = "") {
		router.route(`${prefix}/`)
			.get(this.controller.getCarts)
			.post(this.controller.createCart)

		router.route(`${prefix}/:id`)
			.get(this.controller.getCartById)
			.patch(this.controller.updateCartById)
			.delete(this.controller.deleteCartById)

        router.route(`${prefix}/:id/products`)
            .get(this.controller.getCartProducts)
            .post(this.controller.addProductToCart)
            .patch(this.controller.updateCartProducts)

        router.delete(`${prefix}/:id/products`, this.controller.deleteProductFromCart)

		return router
	}
}

module.exports = new CartsRoutes()