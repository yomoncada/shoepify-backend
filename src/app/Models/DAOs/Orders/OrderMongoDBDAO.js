const MongoDBContainer = require("../../Containers/MongoDBContainer");
const OrderSchema = require('../../Schemas/OrderSchema');

class OrderMongoDBDAO extends MongoDBContainer {
    static instance;
    
    constructor() {
        if (!OrderMongoDBDAO.instance) {
            super('orders', OrderSchema);
            OrderMongoDBDAO.instance = this;
            return this;
        } else {
            return OrderMongoDBDAO.instance;
        }
    }
}

module.exports = OrderMongoDBDAO;