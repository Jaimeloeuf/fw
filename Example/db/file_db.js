'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Library for storing and editing data
*/

// Dependencies
var fs = require('fs');
var path = require('path');

// Container for module (to be exported)
var lib = {};

// Base directory of data folder, or DB files
// TO perhaps read from the env variable
lib.baseDir = path.join(__dirname, '/../.db_files/');

// Create a new file.
lib.create = function (dir, file, data, callback) {
	return new Promise((resolve, reject) => {
		// Open the file for writing
		fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
			if (!err && fileDescriptor)
				resolve(fileDescriptor);

			reject(err, 'Could not create new file, it may already exist');
		});
	});
};


lib.create = (dir, file, data = '') =>
	new Promise((resolve, reject) => {
		// Open the file for writing
		fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
			if (err)
				reject('Could not create new file, it may already exist');
			else {
				// Write data to file if there is any data given
				if (data !== '') {
					// Convert data to string
					var stringData = JSON.stringify(data);

					lib.write(fileDescriptor, stringData)
						.then(() => resolve(true))
						.catch((err) => reject(err));
				}

				resolve(fileDescriptor);
			}
		});
	});


// Write or append??
lib.write = (fileDescriptor, data) => {
	return new Promise((resolve, reject) => {

		// Write to file and close it
		fs.writeFile(fileDescriptor, data, (err) => {
			if (err) {
				reject(err);
				// Perhaps
				ctx.newError(err, 'Error writing to new file');
				resolve(ctx);
			}
			// If no error, close file
			fs.close(fileDescriptor, (err) => {
				if (err)
					reject(err, 'Error closing new file');
				resolve(ctx);
			});

		});
	});
}



// Read data from a file
lib.read = (dir, file, callback) =>
	fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
		if (err)
			reject(err);
		resolve(data);
	});


// Update data in a file
lib.update = function (dir, file, data, callback) {

	// Open the file for writing
	fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
		if (!err && fileDescriptor) {
			// Convert data to string
			var stringData = JSON.stringify(data);

			// Truncate the file
			fs.truncate(fileDescriptor, function (err) {
				if (!err) {
					// Write to file and close it
					fs.writeFile(fileDescriptor, stringData, function (err) {
						if (!err) {
							fs.close(fileDescriptor, function (err) {
								if (!err) {
									callback(false);
								} else {
									callback('Error closing existing file');
								}
							});
						} else {
							callback('Error writing to existing file');
						}
					});
				} else {
					callback('Error truncating file');
				}
			});
		} else {
			callback('Could not open file for updating, it may not exist yet');
		}
	});
};


/*
	I should just have a few basic operations.

	Create a file
	Read/parse a file by using promise chaining
	Write new data to a file
	Update a file by either
		Reading data into memory, updating the data and overwriting past contents
		OR
		Appending/Prepending data to the file
	Delete a file


	Create file, will return a file descriptor for me to use. Can use async await here
	Reading and parsing a file will ultimately return me the data in the file using a in memory data structure
	Writing to a file will just resolve or reject will ctx or nothing?
	Updating a file will just resolve or reject will ctx or nothing?
	Deleting a file will just resolve or reject will ctx or nothing?
*/

// Update data in a file
// Update meaning??
lib.update = function (dir, file, data, callback) {

	// Open the file for writing
	fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
		if (!err && fileDescriptor) {
			// Convert data to string
			var stringData = JSON.stringify(data);

			// Truncate the file
			fs.truncate(fileDescriptor, function (err) {
				if (!err) {
					// Write to file and close it
					lib.write(fileDescriptor, stringData)
						.then(() => resolve())
						.catch((err) => reject(err));

				} else {
					callback('Error truncating file');
				}
			});
		} else {
			callback('Could not open file for updating, it may not exist yet');
		}
	});

};













// Delete a file
lib.delete = function (dir, file, callback) {

	// Open the file for writing
	fs.unlink(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
		if (!err && fileDescriptor) {
			// Convert data to string
			var stringData = JSON.stringify(data);

			// Write to file and close it
			fs.writeFile(fileDescriptor, stringData, function (err) {
				if (!err) {
					fs.close(fileDescriptor, function (err) {
						if (!err) {
							callback(false);
						} else {
							callback('Error closing existing file');
						}
					});
				} else {
					callback('Error writing to existing file');
				}
			});
		} else {
			callback('Could not open file for updating, it may not exist yet');
		}
	});


};


lib.delete = function (dir, file, callback) {
	// Open the file for writing
	fs.unlink(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
		if (!err && fileDescriptor) {
			resolve(ctx);
		} else {
			callback('Could not open file for updating, it may not exist yet');
		}
	});
};



// Export the module
module.exports = lib;
