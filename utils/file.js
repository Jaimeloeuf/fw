'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module with 'fs' module based functionalities made with Promises for easier asyncrhonous usage.
*/

// Dependencies
const fs = require('fs');

module.exports.open = (file) => {
	return new Promise((resolve, reject) => {
		fs.open(lib.baseDir + file + '.log', 'a', (err, fileDescriptor) => {
			if (!err && fileDescriptor)
				return resolve(fileDescriptor);
			else
				return reject(err, 'Could open file for appending');
		});
	});
};

module.exports.append = (fileDescriptor, str) => {
	return new Promise((resolve, reject) => {
		// Append to file and close it
		fs.appendFile(fileDescriptor, str + '\n', (err) => {
			if (err)
				return reject(err, 'Error appending to file');
			return resolve();
		});
	});
};

module.exports.close = (fileDescriptor) => {
	return new Promise((resolve, reject) => {
		fs.close(fileDescriptor, (err) => {
			if (err)
				return reject(err, 'Error closing file that was being appended');
			return resolve();
		});
	})
};