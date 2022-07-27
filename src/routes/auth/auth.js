const { Router } = require('express')
const AuthController = require('../../app/Controllers/Http/AuthController')
const PassportMiddleware = require('../../app/Middlewares/PassportMiddleware');
const MulterMiddleware = require('../../app/Middlewares/MulterMiddleware');
const AuthMiddleware = require('../../app/Middlewares/AuthMiddleware');

const router = new Router()

class AuthRoutes {
	constructor() {
		this.controller = new AuthController()
	}

  	initialize(prefix = "") {
		router.route(`${prefix}/login`)
			.get(
				AuthMiddleware.alreadyAuthenticated, 
				this.controller.renderLogin
			)
			.post(
				PassportMiddleware.authenticate('login', { failureRedirect: '/login-error' }), 
				this.controller.login
			)

		router.route(`${prefix}/logout`)
			.get(
				AuthMiddleware.isLoggedIn, 
				this.controller.logout
			)

		router.route(`${prefix}/register`)
			.get(
				AuthMiddleware.alreadyAuthenticated, 
				this.controller.renderRegister
			)
			.post(
				MulterMiddleware.single('avatar'),
    			PassportMiddleware.authenticate('register', { failureRedirect: '/register-error' }), 
				this.controller.register
			)

		return router
	}
}

module.exports = new AuthRoutes()