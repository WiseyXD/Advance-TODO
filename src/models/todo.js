const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const todoSchema = new Schema ({
    id : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    completed : {
        type : Boolean,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
})
const Todo = model('Todo',todoSchema);

module.exports = Todo;
