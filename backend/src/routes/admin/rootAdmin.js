const express = require("express");
const router = express.Router();

const adminRoutes = require("../user/user");

router.use("", adminRoutes);

module.exports = router;
