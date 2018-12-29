'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Promisified compression and decompression function with GZIP
*/

// Dependencies
const zlib = require('zlib');

module.exports.compress = (data) => {
	return new Promise((resolve, reject) => {
		zlib.gzip(data, (err, compressedData) => {
			if (!err && compressedData)
				return resolve(compressedData);
			return reject(err);
		});
	});
};

module.exports.uncompress = (data) => {
	return new Promise((resolve, reject) => {
		zlib.unzip(data, function (err, uncompressedData) {
			if (!err && uncompressedData)
				return resolve(uncompressedData.toString());
			return reject(err);
		});
	});
};