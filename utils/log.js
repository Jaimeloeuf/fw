'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module exports functions to facilitate library user to write to console or to log data to files.
*/

// Dependencies
const fs = require('fs'); // Module used to access file system

// Just a simple shorthand / abbrev. for process write method
// To see which is the better one? To allow other functions in the same file scope to access.
module.exports.write = (str) => process.stdout.write(str);
module.exports.write = function write(str) { process.stdout.write(str); }


var len; // File scoped variable to use in the log function for optimization, create once, use many times
module.exports.log = () => {
	// There is no named input parameters for this function, as it can take in a variadic amount of print arguemnts
	len = arguments.length;

	// If boolean value is found at the end, use it as condition for newline
	if (typeof (arguments[len - 1]) === 'boolean')
		--len; // Exclude value from being printed out, by reducing the len variable

	for (let i = 0; i < len; i++) {
		let data = arguments[i];
		(typeof (data) !== 'string')
			? console.log(data) // console.log() to print non strings as it can handle those data types automatically
			: write(data); // else print strings with the stdout method from process object as it is faster.
	}

	// If the last arguement is a boolean and is 'false', or if last printed arguement is not a string.
	if (((typeof (arguments[len]) === 'boolean') && (!arguments[len])) || (typeof (arguments[len - 1]) !== 'string'))
		return; // End the function without any trailing new lines characters
	write('\n'); // Print a trailing new line
}


const error_log_file = './logs/error.json'; // This value should be read from the config file
// @TODO Write to error log file and send to error logging microservice node instead
module.exports.log_error = (data) => {
	// Log error that is of Server type, like a file cannot read due to permissions error, to a log/error file
	let data = JSON.stringify(data, null, 4); // Construct the data, the data should be an 'error' object, so Stringfy before write

	// let timeStamp = new Date().toISOString(); // Add a timestamp
	appendFile(error_log_file, data)
		.then(() => true) // Returns a true to indicate log success, else undefined if failed
		.catch((err) => log(err)); // Log the error to console if unable to append to error file.
}

function appendFile(file, data) {
	return new Promise((resolve, reject) => {
		// Try to optimize append file code, check if it puts the whole file into memory
		// before writing to it. Perhaps use a global fileScoped writeStream instead?
		fs.appendFile(file, data, 'utf8', (err) => {
			if (err)
				return reject(err)
			return resolve();
		});
	});
}