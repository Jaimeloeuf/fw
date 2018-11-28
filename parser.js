'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { log } = require('./utils');

module.exports = (ctx, buffer) => {
	// @TODO make this into an async operation that either returns a promise or allow async/await usage
	// Determine content-type before parsing

	// Deal with the error better, perhaps without try/catch
	if (ctx.checkContentType('application/json'))
		try {
			buffer = JSON.parse(buffer);
		} catch (error) {
			log(error);
		}
	else if (ctx.headers["Content-Type"] === 'application/x-www-form-urlencoded')
		buffer = urlencodedParser(buffer);

	log('Payload Received: ', buffer); // Debug logging

	// Return buffer, or return undefined if the value is falsy.
	return buffer || undefined;
};