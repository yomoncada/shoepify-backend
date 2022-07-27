const APITrait = require('../Utils/Traits/APITrait')

class ErrorMiddleware {
    constructor() {
        this.handle = this.handle.bind(this)
    }

    async handle(error, req, res, next) {
        const status = error.status || 500
        const errorItem = {
            message: error.message,
            details: error.details
        }

        // TODO: Mejorar con la nueva estructura de respuesta.
        return res.status(status).json(APITrait.errorResponse(errorItem, status))
    }
}

module.exports = new ErrorMiddleware