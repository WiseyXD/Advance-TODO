const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;

const Todo = require("./models/todo");

mongoose.connect(
    "mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/userapp"
);

async function readAllTodos()
{
    const data = await Todo.find({});
    return data;
}

function createNewTodo(title , description , completed)
{   
    const newTodo = new Todo({
        title,
        description,
        completed
    });
    newTodo.save();
}

async function searchById(title)
{
    const selectedTodo = await Todo.find({title : title});
}

async function deleteTodo(title)
{
    await Todo.deleteOne({title : title})
}






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
app.put("/",async (req,res)=>{
    await Todo.updateOne({title : req.body.title},{
        $set :{
            completed : req.body.completed,
        }
    })
    res.status(200).json({
        msg : "UPDATE Done"
    })
})

// Delete todo by title  
app.delete("/",async(req,res)=>{
    await Todo.deleteOne({title : req.body.title});
    res.status(200).json({
        msg : "DELETE Success"
    })
})


app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
});
