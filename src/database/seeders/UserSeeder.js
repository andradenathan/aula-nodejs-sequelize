const faker = require('faker');
const User = require('../../models/User');

const seedUsers = async function(n) {
	let users = [];
	for(let i = 0; i < n; i++) {
		users.push({
			'name': faker.name.findName(),
			'password': faker.internet.password(8),
			'email': faker.internet.email(),
			'phone': faker.phone.phoneNumber(),
			'date_of_birth': faker.date.past(10, new Date(2001, 0, 1)),
		});
	}
	try {
		await User.bulkCreate(users);
	} catch(err) {
		return new Error;
	}
}

module.exports = seedUsers;