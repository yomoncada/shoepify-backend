const { Router } = require('express')
const OrdersController = require('../../app/Controllers/Http/OrdersController')

const router = new Router()

class OrdersRoutes {
	constructor() {
		this.controller = new OrdersController()
	}

  	initialize(prefix = "") {
		router.post(`${prefix}/`, this.controller.createOrder)

		return router
	}
}

module.exports = new OrdersRoutes()