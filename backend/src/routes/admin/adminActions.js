const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Todo = require("../../models/todo");
const authenticateToken = require("../../middleware/user");

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

module.exports = router;
