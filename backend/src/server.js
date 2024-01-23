require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const adminRoutes = require("./routes/admin");
const premiumRoutes = require("./routes/premium");

mongoose
    .connect(process.env.DATABSE_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);
app.use("/admin", adminRoutes);
app.use("/premium", premiumRoutes);

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
