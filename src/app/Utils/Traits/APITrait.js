const constants = require('../Constants/APIConstants');

class APITrait {
    static successResponse(status = constants.STATUS.OK, message = [], data = []) {
        return {
            success: true,
            result: {
                status,
                message,
                data
            }
        }
    }

    static errorResponse(status = constants.STATUS.BAD_REQUEST, message = [], data = []) {
        return {
            success: false,
            result: {
                status,
                message,
                data
            }
        }
    }
}

module.exports = APITrait