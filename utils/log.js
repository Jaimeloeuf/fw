'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module exports functions to facilitate logging actions, whether it is to the console, a file or even to another service
*/

// Dependencies
const fs = require('fs'); // Module used to access file system

const error_log_file = './logs/error.json'; // This value should be read from the config file

// @TODO Write to error log file and send to error logging microservice node instead
async function log_error(data) {
	// let data.timeStamp = new Date().toISOString(); // Add a timestamp

	try {
		// If written to file, wouldn't the file be destroyed when the container is stopped..
		// Log error that is of Server type, like a file cannot read due to permissions error, to error file.
		data = JSON.stringify(data, null, 4); // Construct the data, the data should be an 'error' object, so Stringfy before write

		// Append this error data to the error file
		await appendFile(error_log_file, data);

		// Try to optimize append file code, check if it puts the whole file into memory
		// before writing to it. Perhaps use a global fileScoped writeStream instead?
		fs.appendFile(file, data, 'utf8', (err) => {
			!!! // Rewrite this part of the code with the node fs promise API.
			if (err)
				return reject(err)
			return resolve();
		});

		return true; // Returns a true to indicate log success, else undefined if failed
	} catch (err) {
		log(err); // Log the error to console if unable to append to error file.
	}
}