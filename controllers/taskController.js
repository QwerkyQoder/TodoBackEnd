const Todo = require("../model/Todo");

exports.createTaskController =  async  (req,res) => {
    // TODO: Dont add anything that is null
    // TODO: Tasks should be a set
    const todoId = req.params.id
    console.log(req.params)
    console.log(req.body)
    const todo = await Todo.findById(todoId)
    if(!todo) return res.status(400).send("Todo does not exists")
    const {text} =req.body
    // todo.tasks.push(text)
    todo.tasks.addToSet(text)
    await todo.save()
    res.json(todo)
}

exports.delTaskController = async(req, res) => {
    // const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
    console.log("Delete Task")
    console.log(req.body)
    const todo = await Todo.findById(req.params.id).select("tasks");
    // console.log(todo)

    const istask = (element) => element == req.body.task;

    const index = todo.tasks.findIndex(istask);
    console.log(index)

    if (index != -1) {
        todo.tasks.splice(index, 1);
        await todo.save();
                res.status(200).json({
                    success:true,
                    message: "User updated"
                })    
    }
} 