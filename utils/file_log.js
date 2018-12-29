'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module for storing and rotating logs into the files system
	Have yet to be tested and intergrated into the server
*/

// Dependencies
const F = require('./file');
var path = require('path');
var zlib = require('zlib');

// Container for module (to be exported)
var lib = {};

// Base directory for storing the log files, should be read from the config module
lib.baseDir = path.join(__dirname, '/../.logs/');

log.append = function (file, str, callback) {
	// Append a string to the given log file. Create the file if it does not exist
	return new Promise((resolve, reject) => {
		// Open the file for appending
		F.open(file)
			.then((fileDescriptor) => append(fileDescriptor, str))
			.then(lib.close) // Pass close function's reference to be called when above resolves.
			.then(resolve) // Call resolve when all is done
			.catch(reject); // Reject any errors and allow the error to bubble further up
	});
};


// List all the logs, and optionally include the compressed logs
lib.list = function (includeCompressedLogs, callback) {
	fs.readdir(lib.baseDir, function (err, data) {
		if (!err && data && data.length > 0) {
			var trimmedFileNames = [];
			data.forEach(function (fileName) {

				// Add the .log files
				if (fileName.indexOf('.log') > -1) {
					trimmedFileNames.push(fileName.replace('.log', ''));
				}

				// Add the .gz files
				if (fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs) {
					trimmedFileNames.push(fileName.replace('.gz.b64', ''));
				}

			});
			callback(false, trimmedFileNames);
		} else {
			callback(err, data);
		}
	});
};

// Compress the contents of one .log file into a .gz.b64 file within the same directory
lib.compress = function (logId, newFileId, callback) {
	var sourceFile = logId + '.log';
	var destFile = newFileId + '.gz.b64';

	// Read the source file
	fs.readFile(lib.baseDir + sourceFile, 'utf8', function (err, inputString) {
		if (!err && inputString) {
			// Compress the data using gzip
			zlib.gzip(inputString, function (err, buffer) {
				if (!err && buffer) {
					// Send the data to the destination file
					fs.open(lib.baseDir + destFile, 'wx', function (err, fileDescriptor) {
						if (!err && fileDescriptor) {
							// Write to the destination file
							fs.writeFile(fileDescriptor, buffer.toString('base64'), function (err) {
								if (!err) {
									// Close the destination file
									fs.close(fileDescriptor, function (err) {
										if (!err) {
											callback(false);
										} else {
											callback(err);
										}
									});
								} else {
									callback(err);
								}
							});
						} else {
							callback(err);
						}
					});
				} else {
					callback(err);
				}
			});

		} else {
			callback(err);
		}
	});
};

// Decompress the contents of a .gz file into a string variable
lib.decompress = function (fileId, callback) {
	var fileName = fileId + '.gz.b64';
	fs.readFile(lib.baseDir + fileName, 'utf8', function (err, str) {
		if (!err && str) {
			// Inflate the data
			var inputBuffer = Buffer.from(str, 'base64');
			zlib.unzip(inputBuffer, function (err, outputBuffer) {
				if (!err && outputBuffer) {
					// Callback
					var str = outputBuffer.toString();
					callback(false, str);
				} else {
					callback(err);
				}
			});
		} else {
			callback(err);
		}
	});
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
