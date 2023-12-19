const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

mongoose.connect(
    "mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/userapp"
);



app.use(express.json());

app.post("/", (req, res) => {
    res.status(201).json({
        msg: "Created an User",
    });
});

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
