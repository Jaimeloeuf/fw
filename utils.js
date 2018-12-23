'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const fs = require('fs'); // Module used to access file system

// Modifications to the utils base on current process's env
const { envName } = require('./config').env;
// Check if current 'env' is 'production'
// if (envName === 'production') {
// 	// Disable console logging and prevent use of debug object's console logging functions.
// 	// Modifying the error logger in debug object to log, but not to the console.
// 	console.log = () => { };
// 	debug.console_lines = () => { };
// 	debug.logout_params = () => { };
// 	debug.error = (err) => {
// 		// @TODO Write to error log file and send to error loggin microservice node instead
// 	};
// }

// Version 1 of write, assumes that it must be a string an no error is made during usage
const write = (str) => process.stdout.write(str);
// Version 2 of write, currently Deperecated 'write' function below
// const write = (str, newline = false) => (typeof (str) !== 'string')
// 	? console.log(str)
// 	: process.stdout.write((newline) ? `${str}\n` : str);

function log() {
	let len = arguments.length;

	// If boolean value is found at the end, use it as condition for newline
	if (typeof (arguments[len - 1]) === 'boolean')
		--len; // Exclude value from being printed out, by reducing the len variable

	for (let i = 0; i < len; i++) {
		let data = arguments[i];
		// Use console.log() for printing out objects, or non strings
		(typeof (data) !== 'string')
			? console.log(data) // As console.log function can handle non-string data types automatically
			: write(data);
	}

	// If the last arguement is a boolean and is 'false', or if last printed arguement is not a string.
	if (((typeof (arguments[len]) === 'boolean') && (!arguments[len])) || (typeof (arguments[len - 1]) !== 'string'))
		return; // End the function without any trailing new lines characters
	console.log(); // Print a trailing new line
}

// @TODO write a condition to check the environment. Disable debug object if envName = 'production'
const debug = {
	console_lines: (n) => {
		// Print out 'n' number of dashes on the console, used to seperate stuff
		while (--n) // A reverse while loop, more efficient than the old for loop
			write('-');
		write('\n');
	},

	logout_params(ctx) {
		// Debug middleware to log out details from ctx object
		debug.console_lines(90);
		// Items from Req obj
		log(`Requested path: '${ctx.path}'`);
		log(`Request method: '${ctx.method}'`);
		log('Queries received in url = ', ctx.query);
		log('Headers received = ', ctx.headers);
		if (ctx.req_body)	// Log req_body if any
			log('Request Body: ', ctx.req_body);
		debug.console_lines(60);
		// Items from Res obj
		log(`Response status code: ${ctx.statusCode}`);
		log('Response Headers are = ', ctx.res_headers);
		log('Response Body: ', ctx.res_body);
		debug.console_lines(60);
		// Log Error if any
		if (ctx.error.length)
			log('Errors in error array for current ctx:\n', ctx.error);
	},
	error: (err) => log(err)
};

// Parse a JSON string to an object in all cases, without throwing
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

function log_error(data) {
	// Log Server type, 500 internal, error data to a log/error file
	let file = '../../logs/' + ((data.type.toLowerCase() === 'error') ? 'error.json' : 'activity.json');
	let write_data = (typeof data === 'string') ? data : JSON.stringify(data, null, 4);

	// let timeStamp = new Date().toISOString(); // Add a timestamp

	fs.appendFile(file, write_data, 'utf8', function (error) {
		// Try to optimize append file code, check if it puts the whole file into memory
		// before writing to it. Perhaps use a global fileScoped writeStream instead?
		if (error) {
			write('error with logger appending file\n');
			if (error.code === 'ENOENT')
				write('File does not exist\n');
		}
	});
}


module.exports = {
	log: log,
	debug: debug,
	parseJSON: parseJSON,
	log_error: log_error
};