'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const url = require('url');
const decoder = new (require('string_decoder').StringDecoder);
const { log, debug } = require('./utils.js');

// Global variables
const PORT = 3000;

const server = http.createServer((req, res) => {
	debug.console_lines(90);
	/*
	Parse req object and save all info into 'data' object
	Route the 'data' object to a handler as defined in the router
	handle the req with the given data, before
	calling the final handler of the req and end the response to the user
	*/

	// Get URL and parse it, parse query strings if any in url
	let parsedUrl = url.parse(req.url, true);

	// Get the path
	let path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
	log(`\nRequested path: '${path}'`);

	// Get the request method
	log(`Request method: '${req.method.toUpperCase()}'`);

	// Get the query string as an object
	let query = parsedUrl.query;
	log('Queries received in url = ', query);

	// Get headers as an object
	let headers = req.headers;
	log('Headers received = ', headers);

	// Get the payload if any
	let buffer = '';
	req.on('data', data => buffer += decoder.write(data));

	// If there is no payload, the 'end' event is fired immediately
	req.on('end', () => {
		buffer += decoder.end(); // Returns any remaining input stored in internal buffer.

		// Logging payload if any
		if (buffer)
			log('Received payload is = ', JSON.parse(buffer));
			// log('Received payload is = ', buffer); // Received buffer is always a string. But in my case, since this
			// api server is designed to talk with JSON, I will parse it first before printing it out.

		// Check router for a matching path for a handler. If none defined, use the notFound handler instead.
		var chosenHandler = (router[path]) ? router[trimmedPath] : handlers.notFound;

		// Construct the data object to send to the handler
		var data = {
			'path': path,
			'query': query,
			// 'method': method,
			'headers': headers,
			'payload': buffer || undefined
		};

		// Route the request to the handler specified in the router
		// chosenHandler(data, (statusCode = 200, res_payload = {}) => {
		chosenHandler(data, (statusCode, res_payload) => {
			// Where This anonymous inner funciton is the callback function called in the handlers.
			// This function is the final handler, also known as the finalHandler in the Express world.

			// Use status code from the handler, else use default status code 200
			statusCode = typeof (statusCode) === 'number' ? statusCode : 200;
			// Use the res_payload returned from the handler, or use default empty object
			res_payload = typeof (res_payload) == 'object' ? res_payload : {};

			// Should I set headers here or just leave it?
			res.writeHead(statusCode);
			// Convert res_payload to string and write it to the 'res' stream
			res.end(JSON.stringify(res_payload));

			log(`Returning this response: ${statusCode}, `, res_payload);
		});
	});

}).listen(PORT, (err) => {
	log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + PORT);
});

const handlers = {};

handlers.login = (data, callback) => {
	// if (async auth_db(headers.authentication)) {
	// 	await ok();
	// 	response.writeHead({ 'Set-cookie': `${cookie}; ${expiry_date};` })
	// 	callback(307, { 'location': `/${location}` })
	// }
}

handlers.logout = (data, callback) => {

}

// Sample handler
handlers.sample = function (data, callback) {
	// Send back a HTTP code and a 'res' payload
	callback(200, { 'handler name': 'sample handler' });
};

// Not found handler
handlers.notFound = function (data, callback) {
	callback(404);
};


// Define the request router
const router = {
	'/login': handlers.login,
	'/logout': handlers.logout,
};
// const router = new Map([
// 	['/login', handlers.login],
// 	['/logout', handlers.logout],
// ]);