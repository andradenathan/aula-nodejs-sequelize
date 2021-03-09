const Event = require('../models/Event');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');

const searchEventByTitle = async(req, res) => {
	const {title} = req.body;
	try {
		const events = await Event.findAll({
			where: {
				title: {
					[Op.like]: '%' + title + '%'
				}
			}
		});

		if (events.length != 0) {
			return res.status(200).json(events);
		}

		throw new Error("Couldn't find any events with this title");

	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const getMostRatedEvents = async(req, res) => {
	const {id} = req.params;
	
	try {
		const events = await Event.findAll({
			order: [
				['rate', 'DESC'],
			],
			limit: id,
		});

		return res.status(200).json({events});
	} catch(err) {
		return res.status(500).json(err + "!");
		}
}

const index = async(req, res) => {
	try {
		const events = await Event.findAll();
		return res.status(200).json({events});
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const show = async(req, res) => {
	const {id} = req.params;
	try {
		const event = await Event.findByPk(id)
		return res.status(200).json({event});
	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const create = async(req, res) => {
	try {
		validationResult(req).throw();
		const event = await Event.create(req.body);
		return res.status(201).json({event});	
	} catch(err) {
		return res.status(500).json(err);
	}
}

const destroy = async(req, res) => {
	const {id} = req.params;
	try {
		const eventDeleted = await Event.destroy(req.body, {where: {id: id}});
		if(eventDeleted) {
			return res.status(200).json("Evento deletado com sucesso!");
		}

		throw new Error;

	} catch(err) {
		return res.status(500).json(err + "!");
	}
}

const update = async(req, res) => {
	try{
		validationResult(req).throw();
		const {id} = req.params;
		const [eventUpdated] = await Event.update(req.body, {
			where: {id: id}
		});

		if(eventUpdated) {
			const event = await Event.findByPk(id);
			return res.status(200).send(event);
		}

		throw new Error('Event not found');
	} catch(err) {
		return res.status(500).json(err);
	}
}

module.exports = {
	index,
	show,
	create,
	destroy,
	update,
	getMostRatedEvents,
	searchEventByTitle
}