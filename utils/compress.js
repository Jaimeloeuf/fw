'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Promisified compression function with GZIP
*/

// Dependencies
const zlib = require('zlib');

module.exports = (data) => {
	return new Promise((resolve, reject) => {
		zlib.gzip(data, (err, compressedData) => {
			if (!err && compressedData)
				return resolve(compressedData);
			return reject(err);
		});
	});
};