const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, unique: true, required: true },
    thumbnail: { type: String },
    price: { type: Number, min: 0, required: true },
    stock: { type: Number, min: 0, required: true },
	createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = ProductSchema;