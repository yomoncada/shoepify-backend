const MongoDBContainer = require("../../containers/MongoDB.container");
const ProductSchema = require('../../../model/schemas/Product.schema');

class MongoDBProductsDao extends MongoDBContainer {
    constructor(){
        super('products', ProductSchema);
    }
}

module.exports = MongoDBProductsDao;