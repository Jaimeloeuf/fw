'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { log } = require('./utils');

module.exports = (ctx, buffer) => {
	// Determine content-type before

	if (ctx.checkContentType('application/json'))
		buffer = JSON.parse(buffer);
	else if (ctx.headers["Content-Type"] === 'application/x-www-form-urlencoded')
		buffer = urlencodedParser(buffer);

	log('Payload Received: ', buffer); // Debug logging

	return buffer || undefined;
};