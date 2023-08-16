const express = require('express');
const tasksController = require('./controllers/tasksController.js');
const tasksMiddleware = require('./middlewares/tasksMiddleware.js');

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.get('/tasks/:id', tasksController.getOne);
router.post('/tasks', tasksMiddleware.validateBody, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksController.updateTask);

module.exports = router;