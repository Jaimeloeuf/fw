'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const url = require('url');

/* Global var */
// Create once, store many times. Prevent variable creation every single time getCTX method is called
// Function can use this variable created at program startup by overwrite the value every single time
var parsedUrl;

/* @Doc Copying koa.js idea on using a ctx object
	Where ctx is an object containing both the req and res objects,
	and data parsed from those 'req,res' objects
	It exposes a easy to use and clean interface for passing data downstream in a middleware lifecycle,
	with many commonly used built in methods.
*/
/*	@TODO
	This is currently a Factory function for 'ctx' object
	Should I change this factory function into a Class,
	with prototypes to extend its functionailty/capability
	Learn how to use function prototypes like below:
	getCTX.prototype.req = req;
*/
module.exports.getCTX = (req, res) => {
	// Get URL and parse it, parse query strings if any in url
	parsedUrl = url.parse(req.url, true);

	// Construct and return ctx object
	return {
		req: req,
		res: res,

		// Parsed url object
		url: parsedUrl,
		// Get the path. Remove / from the start and the end, but keep those in the middle.
		path: parsedUrl.pathname.replace(/^\/+|\/+$/g, ''),
		// Get the request method, make all upper case for consistency
		method: req.method.toUpperCase(),
		// Get headers as an object
		headers: req.headers,
		// User Agent header for analytics
		// userAgent: req.headers['user-agent'];
		// Get the contentType of the incoming req payload, to be used for parsing the payload
		contentType: req.headers["content-type"],
		// Method to check if content-type of incoming req payload is equals to given type
		checkContentType: (type) => type === req.headers["content-type"],
		// Get the query string as an object
		query: parsedUrl.query,

		// Setting Defaults for response object
		statusCode: 200,
		res_headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
			'content-length': 0,
		},
		setContentLength: function(body) { return this.res_headers['content-length'] = Buffer.byteLength(body); },
		res_payload: {}
	};
}