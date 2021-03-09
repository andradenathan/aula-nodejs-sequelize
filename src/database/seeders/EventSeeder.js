const faker = require('faker');
const Event = require('../../models/Event');


const shuffle = function(array) {
	var currentId = array.length, value, randomId;

	while (0 !== currentId) {
		randomId = Math.floor(Math.random() * currentId);
		currentId -= 1;

		value = array[currentId];
		array[currentId] = array[randomId];
		array[randomId] = value;
	}
	
	for(let i = 0; i < array.length; i++) {
		return array[i];
	}
}

const seedEvents = async function(n) {
	let events = [];
	let hostIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	for(let i = 0; i < n; i++) {
		events.push({
			'title': faker.company.companyName(),
			'description': faker.lorem.text(),
			'price': faker.random.number(10, 1000),
			'rate': faker.random.number(100),
			'address': faker.address.city(),
			'starts_at': faker.date.past(),
			'ends_at': faker.date.soon(),
			'contact_number': faker.phone.phoneNumber(),
			'latitude': faker.address.latitude(),
			'longitude': faker.address.longitude(),
			'hostId': shuffle(hostIds)
		});
	}
	try {
		await Event.bulkCreate(events);
	} catch(err) {
		return new Error;
	}
}

module.exports = seedEvents;