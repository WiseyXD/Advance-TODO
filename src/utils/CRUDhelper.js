const Todo = require("../models/todo");
const { v4: uuidv4 } = require("uuid");

async function readAllTodos() {
    const data = await Todo.find({});
    return data;
}

function createNewTodo(title, description, completed, resources) {
    const newTodo = new Todo({
        id: uuidv4(),
        title,
        description,
        completed,
        resources,
    });
    newTodo.save();
}

async function updateTodo(id) {
    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
        return null;
    }
    existingTodo.completed = !existingTodo.completed;
    await existingTodo.save();
    return existingTodo;
}

async function deleteTodoByTitle(title) {
    await Todo.deleteOne({ title: title });
}

async function deleteTodoById(id) {
    await Todo.deleteOne({ id: id });
}

module.exports = {
    readAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodoById,
    deleteTodoByTitle,
};
