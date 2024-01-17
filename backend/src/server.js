const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

mongoose
    .connect(
        "mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/userapp"
    )
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
