const express = require("express");
const router = express.Router();

const adminRoutes = require("../admin/admin");

router.use("", adminRoutes);

module.exports = router;
