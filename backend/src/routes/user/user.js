const express = require("express");
const router = express.Router();
const {
    createUser,
    checkUserInDB,
    JWTtoken,
    secretKey,
} = require("../../service/auth");

router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const existsInDB = await createUser(email, password, username);
    if (!existsInDB) {
        res.status(401).json({
            msg: "User is already present in our DB",
        });
        return;
    }
    res.status(201).json({
        msg: "User Created",
    });
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const existsInDB = await checkUserInDB(email, password);
    if (!existsInDB) {
        res.status(400).json({
            msg: "Account not found in our Database",
        });
        return;
    }
    const token = await JWTtoken(email);
    req.email = email;
    const admin = false;
    res.status(200).json({
        email,
        token,
        admin,
    });
});

module.exports = router;
