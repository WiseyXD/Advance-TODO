const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Todo = require("../../models/todo");
const authenticateToken = require("../../middleware/user");
const { createNewTodo, deleteTodoById } = require("../../utils/CRUDhelper");

// router.use(authenticateToken);

router.get("/allUsers", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            users,
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
});

router.get("/todos/:userId", async (req, res) => {
    const _id = req.params.userId;
    try {
        const user = await User.findOne({ _id });
        const userEmail = user.email;
        const todos = await Todo.find({ email: userEmail });
        res.status(200).json({
            todos,
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
});

router.post("/todos/create/:userId", async (req, res) => {
    const { userId } = req.params;
    const title = req.body.title;
    const description = req.body.description;
    const completed = false;
    const resource = req.body.resource;
    const adminGiven = true;
    const priority = req.body.priority;
    try {
        const user = await User.findOne({ _id: userId });
        const email = user.email;
        const response = await createNewTodo(
            email,
            title,
            description,
            completed,
            adminGiven,
            resource,
            priority
        );
        if (typeof response === "string") {
            return res.status(403).json({
                response,
            });
        }
        res.status(201).json({
            response,
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
});

router.delete("/todos/delete/:todoId", async (req, res) => {
    const { todoId } = req.params;
    try {
        deleteTodoById(todoId);
        res.status(200).json({
            msg: "DELETE Success",
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
});

module.exports = router;
