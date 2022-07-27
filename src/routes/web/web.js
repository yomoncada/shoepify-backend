const { Router } = require('express')
const WebController = require('../../app/Controllers/Http/WebController')
const AuthMiddleware = require('../../app/Middlewares/AuthMiddleware');

const router = new Router()

class WebRoutes {
	constructor() {
		this.controller = new WebController()
	}

  	initialize(prefix = "") {
		router.get(`${prefix}/`, AuthMiddleware.isLoggedIn, this.controller.renderHome)
		router.get(`${prefix}/profile`, AuthMiddleware.isLoggedIn, this.controller.renderProfile)
		router.get(`${prefix}/product-detail/:id`, AuthMiddleware.isLoggedIn, this.controller.renderProductDetail)
		router.get(`${prefix}/cart`, AuthMiddleware.isLoggedIn, this.controller.renderCart)
		router.get(`${prefix}/checkout`, AuthMiddleware.isLoggedIn, this.controller.renderCheckout)

		return router
	}
}

module.exports = new WebRoutes()