const Todo = require("../models/todo");
const { v4: uuidv4 } = require("uuid");

async function readAllTodos() {
    const data = await Todo.find({});
    return data;
}

function createNewTodo(title, description, completed) {
    const newTodo = new Todo({
        id: uuidv4(),
        title,
        description,
        completed,
    });
    newTodo.save();
}

async function updateTodo(title,completed) {
    await Todo.updateOne(
        { title : title},
        {
            $set: {
                completed : completed,
            },
        }
    );
}

async function deleteTodoByTitle(title) {
    await Todo.deleteOne({ title: title });
}

async function deleteTodoById(id) {
    await Todo.deleteOne({ id: id });
}

module.exports = {
    readAllTodos , createNewTodo , updateTodo ,deleteTodoById , deleteTodoByTitle
}