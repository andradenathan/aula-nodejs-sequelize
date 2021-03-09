const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Event = sequelize.define('Event', {
	title: {
		type: DataTypes.STRING(50),
		allowNull: false
	},

	description: {
		type: DataTypes.STRING(250),
		allowNull: false
	},

	rate: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},

	price: {
		type: DataTypes.FLOAT
	},

	address: {
		type: DataTypes.STRING(300),
	},

	starts_at: {
		type: DataTypes.DATE,
		allowNull: false
	},

	ends_at: {
		type: DataTypes.DATE,
		allowNull: false
	},

	contact_number: {
		type: DataTypes.STRING(11),
		allowNull: false
	},

	latitude: {
		type: DataTypes.DOUBLE,
		allowNull: false
	},

	longitude: {
		type: DataTypes.DOUBLE,
		allowNull: false
	}
});


module.exports = Event;