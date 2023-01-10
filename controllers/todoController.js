const Todo = require("../model/Todo");


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
        const newTodo = await Todo.create ({title, tasks})
        console.log(newTodo)
        res.json(newTodo)        
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