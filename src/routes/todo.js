const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/user");

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
    const todos = await readAllTodos();
    res.status(200).json({ todos });
});

router.post("/create", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    const resources = req.body.resources;
    createNewTodo(title, description, completed, resources);
    res.status(201).json({
        msg: "Created a Todo",
    });
});

// Update completed by id
router.put("/completed/:id", (req, res) => {
    updateTodo(req.params.id);
    res.status(200).json({
        msg: "UPDATE Done",
    });
});

// Update todo by id
router.put("/update/:id", (req, res) => {});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
    deleteTodoById(req.params.id);
    res.status(200).json({
        msg: "DELETE Success",
    });
});

module.exports = router;
