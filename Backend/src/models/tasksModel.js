const pool = require('./connection');

const getAll = async () => {
	const [tasks] = await pool.execute('SELECT * FROM tasks');
	return tasks;
};

const getOne = async (id) => {
	const [task] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
	return task[0];
};

const createTask = async (task) => {
	const { title } = task;

	const dateUTC = new Date(Date.now()).toUTCString();

	const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?,?,?)';

	const [createdTask] = await pool.execute(query, [title, 'pendente', dateUTC]);
	return { idInserida: createdTask.insertId };
};

const deleteTask = async (id) => {
	const query = 'DELETE FROM tasks WHERE id = ?';
	const [deletedTask] = await pool.execute(query, [id]);
	return deletedTask;
};

const updateTask = async (id, task) => {
	const oldTask = await getOne(id);

	if (task.title === undefined || task.title === '') 
		task.title = oldTask.title;
	if (task.status === undefined || task.status === '') 
		task.status = oldTask.status;
	

	const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
	const [updatedTask] = await pool.execute(query, [task.title, task.status, id]);
	return updatedTask;
};

module.exports = {
	getAll,
	getOne,
	createTask,
	deleteTask,
	updateTask,
};
