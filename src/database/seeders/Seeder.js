require('../../config/dotenv')();
require('../../config/sequelize');

const seedUsers = require('./UserSeeder');
const seedEvents = require('./EventSeeder');
const { sequelize } = require('../../models/User');

(async() => {
	try {
		await sequelize.sync({ force: true });
		await seedUsers(10);
		await seedEvents(10);
	} catch(err) {
		console.log(err);
	}
})();
