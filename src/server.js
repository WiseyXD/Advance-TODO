const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

const Todo = require("./models/todo");
const {readAllTodos , createNewTodo , updateTodo ,deleteTodoById , deleteTodoByTitle} = require("./utils/CRUDhelper")

mongoose.connect(
    "mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/userapp"
);

app.use(express.json());

// read all todos
app.get("/",async (req,res)=>{
    const todos = await readAllTodos();
    res.status(200).json({todos});
})


// Create new Todo
app.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    createNewTodo(title,description,completed);
    res.status(201).json({
        msg: "Created a Todo",
    });
});


// Update todo by title
app.put("/",(req,res)=>{
    updateTodo(req.body.title,req.body.completed);
    res.status(200).json({
        msg : "UPDATE Done"
    })
})


// Delete todo by id 
app.delete("/id",async(req,res)=>{
    deleteTodoById(req.body.id);
    res.status(200).json({
        msg : "DELETE Success"
    })
})


// Delete todo by title 
app.delete("/title",(req,res)=>{
    deleteTodoByTitle(req.body.title)
    res.status(200).json({
        msg : "DELETE Success"
    })
})


app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
