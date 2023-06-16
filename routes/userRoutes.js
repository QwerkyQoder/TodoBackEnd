const express = require("express")
const router = express.Router();
const {home, register, login, logout} = require("../controllers/userController")
const {createTodoController, editTodosController, getTodosController, delTodoController} = require("../controllers/todoController")
const {createTaskController, delTaskController } = require("../controllers/taskController");
const { isLoggedIn } = require("../middleware/authentication");


router.get("/", home)
router.post("/createTodo", isLoggedIn, createTodoController);
router.put("/createTask/:id", isLoggedIn, createTaskController)
router.get("/getTodos", isLoggedIn, getTodosController)
router.delete("/deleteTodo/:id", isLoggedIn, delTodoController)
router.put("/editTodo/:id", isLoggedIn, editTodosController)
router.put("/delTask/:id",isLoggedIn, delTaskController)


router.post("/register", register);
router.post("/login", login)
router.post("/logout", isLoggedIn, logout)

module.exports = router;