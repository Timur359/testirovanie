const Router = require('express');
const router = new Router();
const todoController = require('../controller/todo.controller');

router.get('/todos', todoController.getTodo);
router.post('/todos', todoController.createTodo);
router.put('/todos', todoController.updateTodo);

module.exports = router;
