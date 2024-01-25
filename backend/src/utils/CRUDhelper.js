const Todo = require("../models/todo");
const User = require("../models/user");
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

async function createNewTodo(
    email,
    title,
    description,
    completed,
    resource,
    adminGiven
) {
    const user = await User.findOne({ email });
    if (!user.premium && (await Todo.countDocuments({ email: email })) >= 10) {
        const message = "Free tier users can only create 10 Todos";
        return message;
    }

    const newTodo = new Todo({
        email,
        title,
        description,
        completed,
        adminGiven,
        resources: [resource],
    });
    newTodo.save();
    return true;
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

async function updateTodoBody(id, updateObject) {
    try {
        const updatingTodo = await Todo.findByIdAndUpdate(id, updateObject, {
            new: true,
            runValidators: true,
        });
    } catch (error) {
        return error.message;
    }
}

async function updateResource(id, resource) {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: id },
            { $push: { resources: resource } },
            { new: true, runValidators: true }
        );
        if (!updatedTodo) {
            console.error("Todo not found.");
            return null;
        }
        return updatedTodo;
    } catch (error) {
        console.error("Error updating resource:", error);
        throw error;
    }
}

async function deleteTodoById(id) {
    await Todo.deleteOne({ _id: id });
}

module.exports = {
    readAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodoById,
    updateTodoBody,
    updateResource,
};
