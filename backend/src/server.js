require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

const rootUserRoutes = require("./routes/user/rootUser");
const rootAdminRoutes = require("./routes/admin/rootAdmin");

mongoose
    .connect(process.env.DATABSE_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/user", rootUserRoutes);
app.use("/admin", rootAdminRoutes);

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
