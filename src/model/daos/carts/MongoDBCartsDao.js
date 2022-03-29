const MongoDBContainer = require("../../containers/MongoDBContainer");
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, min: Date.now() },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
});

class MongoDBCartsDao extends MongoDBContainer {
    constructor(){
        super('carts', cartSchema);
    }
}

module.exports = MongoDBCartsDao;