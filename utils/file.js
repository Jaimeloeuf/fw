'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module with 'fs' module based functionalities made with Promises for easier asyncrhonous usage.
*/

// Dependencies
const fs = require('fs');

module.exports.open = (file, option = 'a') => {
	/*	Option for opening the file
		a: append to the file
		wx: write to the file
	*/

	return new Promise((resolve, reject) => {
		fs.open(file, option, (err, fileDescriptor) => {
			if (!err && fileDescriptor)
				return resolve(fileDescriptor);
			return reject(err); // Could open file for appending
		});
	});
};

// Defaults to a utf8 encoding file
module.exports.read = (file_path, encoding = 'utf8') => {
	return new Promise((resolve, reject) => {
		fs.readFile(file_path, encoding, (err, fileData) => {
			if (err)
				return reject(err);
			return resolve(fileData);
		});
	});
};

module.exports.write = (fileDescriptor, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileDescriptor, data, (err) => {
			if (err)
				return reject(err);
			return resolve();
		});
	});
};

// newline to add a newline at the end of the input string or not. Defaults to true.
module.exports.append = (fileDescriptor, str, newline = true) => {
	return new Promise((resolve, reject) => {
		fs.appendFile(fileDescriptor, str + (newline ? '\n' : ''), (err) => {
			if (err)
				return reject(err); // Error appending to file
			return resolve();
		});
	});
};

module.exports.readDir = (dir) => {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, function (err, data) {
			if (err)
				return reject(err);
			return resolve(data);
		});
	});
};

module.exports.close = (fileDescriptor) => {
	return new Promise((resolve, reject) => {
		fs.close(fileDescriptor, (err) => {
			if (err)
				return reject(err); // Error closing file
			return resolve();
		});
	})
};