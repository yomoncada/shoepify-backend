const MongoDBContainer = require("../../containers/MongoDB.container");
const CartSchema = require('../../../model/schemas/Cart.schema');

class MongoDBCartsDao extends MongoDBContainer {
    constructor(){
        super('carts', CartSchema);
    }

    async getByUser(userId) {
        try {
            const cart = await this.model.findOne({ user: userId, processed: false }, { __v: 0 });
          
            if (!cart) {
                return null;
            } else {
                return cart;
            }
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
}

module.exports = MongoDBCartsDao;