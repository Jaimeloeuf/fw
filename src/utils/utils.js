'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Common module to expose all the utils via a single common module called utils.
	Use object deconstruction to get the functions out.
*/

// const { log_error } = require('./log');

// Parse a JSON string to an object in all cases, silencing any errors
const parseJSON = (str) => {
	try { return JSON.parse(str); }
	catch (e) { return {}; } // Should I return false here instead
};

const parseJSON2 = (str) => {
	return new Promise((resolve, reject) => {
		try { resolve(JSON.parse(str)); }
		catch (err) { reject(err); } // Should I return false here instead
	})
};

module.exports = {
	// The write/logging methods are just simple bindings for abbrevation
	print: console.log,
	write: process.stdout.write,
	log_error: console.error,
	debug: require('./debug'),
	parseJSON
};