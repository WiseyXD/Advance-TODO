const express = require("express");
const router = express.Router();

const userRoutes = require("../user/user");
const todoRoutes = require("../user/todo");
const premiumRoutes = require("../user/premium");

router.use("", userRoutes);
router.use("/todo", todoRoutes);
router.use("/premium", premiumRoutes);

module.exports = router;
