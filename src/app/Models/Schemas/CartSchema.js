const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number }
        }
    ],
    processed: { type: Boolean, default: false },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = CartSchema;