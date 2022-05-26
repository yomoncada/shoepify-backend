const MongoDBContainer = require("../../containers/MongoDB.container");
const OrderSchema = require('../../schemas/Order.schema');

class MongoDBOrdersDao extends MongoDBContainer {
    constructor(){
        super('orders', OrderSchema);
    }
}

module.exports = MongoDBOrdersDao;