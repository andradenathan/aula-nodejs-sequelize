const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false
	},

	date_of_birth: {
		type: DataTypes.DATE,
		allowNull: false,
	},

	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

User.associate = function(models) {
	User.hasMany(models.Event, {
		as: "hostedEvents",
		foreignKey: "hostId"
	});
}

module.exports = User;
