
const APITrait = require('../../Utils/Traits/APITrait')
const UsersService = require('../../Services/UsersService')

class AuthController {
    constructor() {
        this.service = new UsersService
        this.renderLogin = this.renderLogin.bind(this)
        this.renderRegister = this.renderRegister.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.register = this.register.bind(this)
    }

    async renderLogin(req, res, next) {
        try {
            res.render('pages/user/login');
        } catch(error) {
            next(error)
        }
    }

    async renderRegister(req, res, next) {
        try {
            res.render('pages/user/register');
        } catch(error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            return res.redirect('/')
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            return res.redirect('/')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController