const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email",
      ]
    },
    password: { type: String, required: true },
    name: { type: String },
    address: { type: String },
    age: { type: String },
    phoneNumber: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

UserSchema.index({ email: 1 });

module.exports = UserSchema;