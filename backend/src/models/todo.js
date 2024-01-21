const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const todoSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resources: {
        type: [resourceSchema],
        required: false,
    },
});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
