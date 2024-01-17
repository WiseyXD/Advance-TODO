const Todo = require("../models/todo");
const { v4: uuidv4 } = require("uuid");

async function readAllTodos(email) {
    try {
        const data = await Todo.find(email);
        return data;
    } catch (error) {
        const msg = error.message;
        return msg;
    }
}

function createNewTodo(email, title, description, completed, resources) {
    const newTodo = new Todo({
        email,
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

async function deleteTodoById(id) {
    await Todo.deleteOne({ id: id });
}

module.exports = {
    readAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodoById,
};
