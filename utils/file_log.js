'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module for storing and rotating logs into the files system
	Have yet to be tested and intergrated into the server
*/

// Dependencies
const { open, read, write, append, readDir, close } = require('./file');
const { compress, uncompress } = require('./compress');

// Container for module (to be exported)
const lib = {};

// Base directory for storing the log files, should be read from the config module
var { join } = require('path');
lib.baseDir = join(__dirname, '/../.logs/');


// Below are 2 different versions of the same functionality one using Promise chaining and one using async/await
lib.append = function (file, str) {
	// Append a string to the given log file. Create the file if it does not exist
	return new Promise((resolve, reject) => {
		open(lib.baseDir + file + '.log')
			.then((fileDescriptor) => append(fileDescriptor, str))
			.then(close) // Pass close function's reference to be called when above resolves.
			.then(resolve) // Call resolve when all is done
			.catch(reject); // Reject any errors and allow the error to bubble further up
	});
};
lib.append = async (file, str) => {
	try {
		let fileDescriptor = await open(lib.baseDir + file + '.log');
		await append(fileDescriptor, str);
		await close(fileDescriptor); // Pass close function's reference to be called when above resolves.
	} catch (err) { // Let error bubble up
		return err;
	}
};

// List all the logs, and optionally include the compressed logs
lib.list = function (includeCompressedLogs) {
	return new Promise((resolve, reject) => {
		readDir(lib.baseDir)
			.then((data) => {
				if (data && data.length > 0) {
					let fileNames = [];
					data.forEach((fileName) => {
						if (fileName.indexOf('.log') > -1)
							fileNames.push(fileName.replace('.log', '')); // Trim and Add the .log files
						else if (fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs)
							fileNames.push(fileName.replace('.gz.b64', '')); // Trim and Add the .gz files
						else
							fileNames.push(`Unknown file type: ${fileName}`); // Add the files of unknown type
					});
					return resolve(trimmedFileNames);
				}
				else
					return reject('No data available'); // If data 'null' or 'undefined'
			})
			.catch((err) => reject(err)); // Other errors, like those bubbled up from readDir
	});
};

// Compress the contents of one .log file into a .gz.b64 file within the same directory
lib.compress = async (logId, newFileId, callback) => {
	try {
		let fileData = await read(lib.baseDir + logId + '.log'); // Read the source file
		let compressedData = await compress(fileData); // Compress the data using gzip
		let fileDescriptor = await open(newFileId + '.gz.b64', 'wx'); // Open the destination file
		await write(fileDescriptor, compressedData.toString('base64')); // Encode to base64 and write to destination file
		await close(fileDescriptor); // Close the destination file
	} catch (err) { // Let error bubble up
		return err;
	}
};

// Decompress the contents of a .gz file
lib.decompress = async (fileId, newFile) => {
	try {
		let fileData = await read(lib.baseDir + fileId + '.gz.b64'); // Better construct this, perhaps a ternary check?
		let uncompressedData = await uncompress(Buffer.from(fileData, 'base64'));
		if (newFile) {
			// If newfile is a file path and not undefined, then save the string data into that file
			let fileDescriptor = await open(newFile, 'wx');
			await write(fileDescriptor, uncompressedData);
			await close(fileDescriptor);
			return resolve();
		}
		return resolve(uncompressedData); // Return decompressed data if no file is specified
	} catch (err) { // Let error bubble up
		return err;
	}
};

// Truncate a log file
lib.truncate = function (logId, callback) {
	fs.truncate(lib.baseDir + logId + '.log', 0, function (err) {
		if (!err) {
			callback(false);
		} else {
			callback(err);
		}
	});
};

// Export the module
module.exports = lib;