const MongoDBContainer = require("../../containers/MongoDBContainer");
const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

const productSchema = new mongoose.Schema({
    timestamp: { type: Date, min: Date.now() },
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, unique: true, required: true },
    thumbnail: { type: String },
    price: { type: Double, min: 0, required: true },
    stock: { type: Number, min: 0, required: true }
});

class MongoDBProductsDao extends MongoDBContainer {
    constructor(){
        super('products', productSchema);
    }
}

module.exports = MongoDBProductsDao;