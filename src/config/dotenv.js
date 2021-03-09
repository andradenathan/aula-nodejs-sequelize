module.exports = function dotEnvConfig() {
	const result = require('dotenv').config();
	if (result.error) { 
		throw result.error
	}
}