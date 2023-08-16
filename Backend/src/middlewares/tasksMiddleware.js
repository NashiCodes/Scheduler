const validateBody = (req, res, next) => {
	const { body } = req;
	
	console.log(body);

	if (body.title === undefined) 
		return res.status(400).json({ message: 'O campo title é requerido' });
	else if(body.title === '')
		return res.status(400).json({ message: 'O campo title não pode ser vazio' });
	else
		next();
};

module.exports = {
	validateBody
};