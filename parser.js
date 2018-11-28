'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { parse: urlencodedParser } = require('querystring');

module.exports = (ctx) => {
	return new Promise((resolve, reject) => {
		// Parse payload if any
		if (ctx.req_payload) {
			// Parse buffer if JSON format is specified
			if (ctx.checkContentType('application/json')) {
				try { ctx.req_payload = JSON.parse(ctx.req_payload); }
				catch (error) { reject('ERROR: Parser cannot parse JSON'); }
			}
			else if (ctx.checkContentType('application/x-www-form-urlencoded'))
				ctx.req_payload = urlencodedParser(ctx.req_payload); // Does this need try/catch too? Might throw error?
			else
				reject(`ERROR: Unknown content-type for payload received: ${ctx.headers["content-Type"]}`)

			resolve(ctx); // Resolve with 'ctx' for the next function in 'then' chaining
		}
	});
};