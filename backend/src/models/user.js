const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        default: false,
    },
});
const User = model("User", userSchema);

module.exports = User;
