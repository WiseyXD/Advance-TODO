const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middleware/user");
const Todo = require("../../models/todo");

const {
    readAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodoById,
    deleteTodoByTitle,
    updateTodoBody,
    updateResource,
} = require("../../utils/CRUDhelper");

router.use(authenticateToken);

router.get("/", async (req, res) => {
    const email = req.email;
    const todos = await readAllTodos(email);
    res.status(200).json({ todos });
});

router.post("/create", async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const completed = false;
        const resource = req.body.resource;
        const email = req.email;
        const adminGiven = false;
        const priority = req.body.priority;
        const response = await createNewTodo(
            email,
            title,
            description,
            completed,
            adminGiven,
            resource
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
        res.status(403).json({
            msg,
        });
    }
});

// Update completed by id
router.put("/completed/:id", (req, res) => {
    const existingTodo = updateTodo(req.params.id);
    res.status(200).json({
        msg: "UPDATE Done",
        completed: existingTodo.completed,
    });
});

// Update todo by id
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updateObject = {};
        if (req.body.title) {
            updateObject.title = req.body.title;
        }
        if (req.body.description) {
            updateObject.description = req.body.description;
        }
        const updatedTodo = await updateTodoBody(id, updateObject);
        // Save the updated todo to the database

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add resource
router.post("/resource/:id", async (req, res) => {
    const { id } = req.params;
    const resource = {
        name: req.body.name,
        link: req.body.link,
    };
    try {
        const updatedTodo = await updateResource(id, resource);
        // Save the updated todo to the database

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// delete todo
router.delete("/delete/:id", authenticateToken, async (req, res) => {
    deleteTodoById(req.params.id);
    res.status(200).json({
        msg: "DELETE Success",
    });
});

module.exports = router;
