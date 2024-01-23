const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/user");

router.put("/", authenticateToken, async (req, res) => {
    const email = req.email;
    try {
        const updateUser = await User.findOneAndUpdate(
            { email },
            { $set: { premium: true } },
            { new: true }
        );
        const msg = "Wohh Upgraded to Premium Tier";
        res.status(200).json({
            msg,
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg,
        });
    }
});

module.exports = router;
