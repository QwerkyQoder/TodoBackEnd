const express = require("express")
const router = express.Router();
const {home, register} = require("../controllers/userController")
const {createTodoController, editTodosController, getTodosController, delTodoController} = require("../controllers/todoController")
const {createTaskController, delTaskController } = require("../controllers/taskController")


router.get("/", home)
router.post("/createTodo", createTodoController);
router.put("/createTask/:id", createTaskController)
router.get("/getTodos", getTodosController)
router.delete("/deleteTodo/:id", delTodoController)
router.put("/editTodo/:id", editTodosController)
router.put("/delTask/:id",delTaskController)


router.post("/register", register);
router.post("/login", login)

module.exports = router;