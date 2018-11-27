'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const url = require('url');

/* @Doc Copying koa.js idea on using a ctx object
	Where ctx is an object containing both the req and res objects,
	and data parsed from those 'req,res' objects
	It exposes a easy to use and clean interface for passing data downstream in a middleware lifecycle,
	with many commonly used built in methods.
*/
/*	This is currently a Factory function for 'ctx' object
	Should I change this factory function into a Class,
	with prototypes to extend its functionailty/capability
	
	Learn how to use function prototypes like below:
	getCTX.prototype.req = req;
*/
module.exports.getCTX = (req, res) => {
	// Parsing items/data from req object
	// Get URL and parse it, parse query strings if any in url
	let parsedUrl = url.parse(req.url, true);
	// Get the path. Remove / from the start and the end, but keep those in the middle.
	let path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
	// Get the request method
	let method = req.method.toUpperCase();
	// Get the query string as an object
	let query = parsedUrl.query;
	// Get headers as an object
	let headers = req.headers;
	
	// Setting Defaults for response object
	let statusCode = 200, res_payload = {};
	
	// Construct and return ctx object
	return {
		req: req,
		res: res,
		url: parsedUrl,
		path: path,
		method: method,
		headers: headers,
		query: query,

		// Response stuff
		statusCode: statusCode,
		res_payload: res_payload
	};
}