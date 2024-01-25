const express = require("express");
const router = express.Router();

const adminRoutes = require("../admin/admin");
const adminActionsRoutes = require("../admin/adminActions");

router.use("/auth", adminRoutes);
router.use("", adminActionsRoutes);

module.exports = router;
