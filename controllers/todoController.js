const Todo = require("../model/Todo");
const User = require("../model/User");
const CustomError = require("../utils/CustomError")

exports.getTodosController = async(req, res) => {
    // const {todoId} = req.params
    try {
        const allTodos = await Todo.find()
        console.log("In GetTodo")
        console.log(allTodos)
        res.status(200).json(allTodos)
        // res.json(allTodos)
    } catch (error) {
        res.status(401).json({
            success: false,
            message: e.message
        })
    }
} 

exports.createTodoController = async (req,res) => {
    // TODO: Check for Duplicate TODO
    // TODO: Error Handling
    const {title, tasks} = req.body
    console.log(req.body)
    try {
        // const newTodo = await Todo.create ({title, tasks})
        // console.log(newTodo)
        const user = await User.findById(req.user._id)
        // console.log(user.todoList.find({$elemMatch: {title}}))
        const dup = user.todoList.filter(function (entry) { return entry.title === title; })
        console.log("duplicates", dup)
        if(dup.length > 0) {
            console.log("Duplicate entry", dup)
            // throw new CustomError('Duplicate Todo Entry', 400)  
            dup[0].tasks.addToSet(tasks)
            await user.save()     
            res.status(201).json({
                success: true,
                message: "Duplicate Todo- merging tasks"})
        }
        else {
        const newTodo = await user.todoList.addToSet(text) ({title, tasks})
        // user.todoList.push(Todo)    
        // console.log(newTodo)
        await user.save()     
        res.json(newTodo)
        }
    } catch (error) {
        console.log(error.message)   
    }

}

exports.editTodosController = async(req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success:true,
            message: "User updated"
        })
    console.log("In EdittTodo")
    // res.json(todo)
} 

exports.delTodoController = async (req, res) => {
    console.log("TODO DELETE CONTROLLER")
    const delTodo = await Todo.findByIdAndDelete(req.params.id)
    console.log(delTodo)
    res.status(201).json(delTodo)
}