const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = OrderSchema;