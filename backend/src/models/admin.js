const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const adminSchema = new Schema({
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
        default: true,
    },
    admin: {
        type: Boolean,
        default: true,
    },
});
const Admin = model("Admin", adminSchema);

module.exports = Admin;
