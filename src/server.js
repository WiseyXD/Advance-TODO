const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
