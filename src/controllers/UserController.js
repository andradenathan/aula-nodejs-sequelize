const User = require('../models/User');
const Event = require('../models/Event');
const {Op} = require('sequelize');

const getUserEvents = async(req, res) => {
	try {
		const {id} = req.params;
		const users = await User.findByPk(id, {
			include: 
				[{
					model: Event, 
					as: "hostedEvents"
				}]
		}
	);
		return res.status(200).json(users);
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const listUsersByAge = async(req, res) => {
	try {
		const users = await User.findAll({order:
		[
			['date_of_birth', 'ASC']
		]
	});
		const ages = users.map((user) => {
			return {
				'id': user.id,
				'name': user.name,
				'date_of_birth': user.date_of_birth,
				'age': calculateAge(user.date_of_birth),
			}
		});
		return res.status(200).json({'ages': ages});
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const calculateAge = function(birthday) {
	const ageDifMs = Date.now() - new Date(birthday);
	const ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970); 
}

const index = async(req, res) => {
	try {
		const user = await User.findAll();
		return res.status(200).json({user});

	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const show = async(req, res) => {
	const {id} = req.params;
	try {
		const user = await User.findByPk(id);
		return res.status(200).json({user});
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const create = async(req, res) => {
	const userData = {
		name: req.body.name,
		email: req.body.email,
		date_of_birth: req.body.date_of_birth,
		password: req.body.password,
		phone: req.body.phone,
	}

	try {
		const user = await User.create(userData);
		return res.status(201).json({user});
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const destroy = async(req, res) => {
	const {id} = req.params;
	try {
		const userDeleted = await User.destroy(req.body, {where: {id: id}});
		if(userDeleted) {
			return res.status(200).json("Usuário deletado com sucesso!");
		}

		throw new Error;

	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const update = async(req, res) => {
	try {
		const {id} = req.params;
		const [userUpdated] = await User.update(req.body, {where: {id: id}});
		
		if(userUpdated) {
			const user = await User.findByPk(id);
			return res.status(200).json(user);
		}

		throw new Error('User not found');

	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

module.exports = {
	index,
	create,
	show,
	destroy,
	update,
	listUsersByAge,
	getUserEvents
}