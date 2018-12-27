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
			if (ctx.checkContentType('application/json')) { // Check for JSON format
				try { ctx.req_body = JSON.parse(ctx.req_body); }
				catch (error) { return reject(error); }
				// ^Why do I need to return a reject here? Oh ya, return stops it from continuing? THast so stupid

				// parseJSON(ctx.req_body)
				// 	.then((data) => ctx.req_body = data)
				// 	.catch((err) => reject(err))

				// ctx.req_body = await parseJSON.catch((err) => reject(err));

				// Use the generator waterfall thing?
			}
			else if (ctx.checkContentType('application/x-www-form-urlencoded')) // Check for URL-encoded Key/Value pairs
				ctx.req_body = urlencodedParser(ctx.req_body); // Does this need try/catch too? Might throw error?
			else if (ctx.checkContentType('text/plain')); // Do nothing if it is plain text
			else
				return reject(`ERROR: Unknown content-type for payload received: ${ctx.contentType}`);
		}
		// resolve called after if block Promise is always resolved even if payload is empty.
		resolve(); // Do I need to return the resolve now? Since this is the last line of code in this block
	});
};