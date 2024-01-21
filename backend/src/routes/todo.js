const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/user");
const Todo = require("../models/todo");

const {
    readAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodoById,
    deleteTodoByTitle,
} = require("../utils/CRUDhelper");

router.use(authenticateToken);

router.get("/", async (req, res) => {
    const email = req.email;
    console.log(email);
    const todos = await readAllTodos({ email });
    res.status(200).json({ todos });
});

router.post("/create", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    const resources = req.body.resources;
    const email = req.email;
    createNewTodo(email, title, description, completed, resources);
    res.status(201).json({
        msg: "Created a Todo",
    });
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
        const existingTodo = await Todo.findById(id);
        if (!existingTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        if (req.body.title) {
            existingTodo.title = req.body.title;
        }
        if (req.body.completed !== undefined) {
            existingTodo.completed = req.body.completed;
        }
        if (req.body.description) {
            existingTodo.description = req.body.description;
        }
        if (req.body.resources) {
            existingTodo.resources.push(...req.body.resources);
        }

        // Save the updated todo to the database
        const updatedTodo = await existingTodo.save();

        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
    deleteTodoById(req.params.id);
    res.status(200).json({
        msg: "DELETE Success",
    });
});

module.exports = router;
