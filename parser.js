'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { log } = require('./utils');
const { parse: urlencodedParser } = require('querystring');

// @TODO make this into an async operation that either returns a promise or allow async/await usage
module.exports = (ctx, buffer) => {
	// Parse payload if any
	if (buffer) {
		// Parse buffer if JSON format is specified
		if (ctx.checkContentType('application/json')) {
			try {
				// @TODO make JSON.parse into an async action
				buffer = JSON.parse(buffer);
			} catch (error) {
				// Perhaps modify CTX agn by adding in a error object, for finalHandler to deal with
				log(error);
			}
		}
		else if (ctx.checkContentType('application/x-www-form-urlencoded'))
			buffer = urlencodedParser(buffer);
		else
			log(`ERROR: Unknown content-type for payload received: ${ctx.headers["content-Type"]}`)

		// Debug logging
		log('Payload Received: ', buffer);
	}
	else
		log('ERROR: Empty buffer received in parser module');

	// Add buffer/payload from request to 'ctx', or undefined if buffer is falsy.
	// Return payload back to function caller
	return ctx.payload = buffer || undefined;
};