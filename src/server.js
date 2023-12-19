const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

const {readAllTodos , createNewTodo , updateTodo ,deleteTodoById , deleteTodoByTitle} = require("./utils/CRUDhelper")
const {createUser,checkUserInDB} = require("./utils/DBaccess");

mongoose.connect(
    "mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/userapp"
);

app.use(express.json());

// signup
app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const existsInDB = await createUser(email,password);
    if(!existsInDB)
    {
        res.status(401).json({
            msg : "User is already present in our DB",
        })
        return;
    }
    res.status(201).json({
        msg : "User Created",
    })
})

app.post("/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const existsInDB = await checkUserInDB(email,password);
    if(!existsInDB)
    {
        res.status(400).json({
            msg : "Account not found in our Database"
        })
        return;
    }
    res.status(200).json({
        msg : "Account found in our Database"
    })
})


// read all todos
app.get("/todos",async (req,res)=>{
    const todos = await readAllTodos();
    res.status(200).json({todos});
})


// Create new Todo
app.post("/todos", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    createNewTodo(title,description,completed);
    res.status(201).json({
        msg: "Created a Todo",
    });
});


// Update todo by title
app.put("/todos",(req,res)=>{
    updateTodo(req.body.title,req.body.completed);
    res.status(200).json({
        msg : "UPDATE Done"
    })
})


// Delete todo by id 
app.delete("/todos/id",async(req,res)=>{
    deleteTodoById(req.body.id);
    res.status(200).json({
        msg : "DELETE Success"
    })
})


// Delete todo by title 
app.delete("/todos/title",(req,res)=>{
    deleteTodoByTitle(req.body.title)
    res.status(200).json({
        msg : "DELETE Success"
    })
})


app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
