const tasksModel = require('../models/tasksModel');

const getAll = async (req, res) => {
	const tasks = await tasksModel.getAll();
	return res.status(200).json(tasks);
};

const getOne = async (req, res) => {
	const { id } = req.params;
	const task = await tasksModel.getOne(id);
	return task ? res.status(200).json(task) : res.status(404).json({ message: 'Tarefa não encontrada' });
};

const createTask = async (req, res) => {
	const createdTask = await tasksModel.createTask(req.body);
	return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const deletedTask = await tasksModel.deleteTask(id);
	return deletedTask.affectedRows ? res.status(200).json({ message: 'Tarefa excluída com sucesso' }) : res.status(404).json({ message: 'Tarefa não encontrada' });
};

const updateTask = async (req, res) => {
	const { id } = req.params;
	
	const updatedTask = await tasksModel.updateTask(id, req.body);
	return updatedTask.affectedRows ? res.status(200).json({ message: 'Tarefa atualizada com sucesso' }) : res.status(404).json({ message: 'Tarefa não encontrada' });
};

module.exports = {
	getAll,
	getOne,
	createTask,
	deleteTask,
	updateTask,
};