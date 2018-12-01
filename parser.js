'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { parse: urlencodedParser } = require('querystring');

/*	@TODO
	See if this function can be potentially memoized. Esp. the JSON parsing part
*/
module.exports = (ctx) => {
	return new Promise((resolve, reject) => {
		// Parse payload if any
		if (ctx.req_body) {
			// Parse buffer if JSON format is specified
			if (ctx.checkContentType('application/json')) {
				try { ctx.req_body = JSON.parse(ctx.req_body); }
				catch (error) { return reject(error); }
			}
			else if (ctx.checkContentType('application/x-www-form-urlencoded'))
				ctx.req_body = urlencodedParser(ctx.req_body); // Does this need try/catch too? Might throw error?
			else
				return reject(`ERROR: Unknown content-type for payload received: ${ctx.contentType}`);
		}
		// resolve called after if block so next function in Promise chain always called even if payload is empty
		resolve(ctx); // Resolve with 'ctx' for the next function in 'then' chaining
	});
};