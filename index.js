'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { env } = require('./config');
const http = require('http');
const url = require('url');
const decoder = new (require('string_decoder').StringDecoder);
const { log, debug } = require('./utils');

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
			if (req.headers["content-type"] === 'application/json') // How do I detect if the received payload is a JSON? By content-type?
				log('Received payload is = ', JSON.parse(buffer));
		// log('Received payload is = ', buffer); // Received buffer is always a string. But in my case, since this
		// api server is designed to talk with JSON, I will parse it first before printing it out.


		// Check router for a matching path for a handler. If none defined, use the notFound handler instead.
		// let chosenHandler = (router[path]) ? router[path] : handler.notFound;
		let chosenHandler = router[path];
		if (!chosenHandler)
			chosenHandler = handler.notFound;

		// Construct the data object to send to the handler
		let data = {
			'path': path,
			'query': query,
			// 'method': method,
			'headers': headers,
			'payload': buffer || undefined
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, finalHandler);

		// Where This anonymous inner funciton is the next function called in the handlers.
		// This function is the final handler, also known as the finalHandler in the Express world.
		// I should probably refactor the function out into a seperate module like what Express did
		function finalHandler({ statusCode = 200, res_payload = {} } = {}) { // I shld copy koa and pass a ctx to this
			// Learn more about object destructuring for function parameters

			// Should I set headers here or just leave it?

			res.setHeader('Content-type', 'application/json');
			res.writeHead(statusCode);

			// Convert res_payload to string and write it to the 'res' stream
			// Should this conversion be done in the handler function? Or done here?
			// Maybe allow one more option in the handler to specify if they want the payload to be stringfied
			res.end(JSON.stringify(res_payload));

			log(`Returning this response: ${statusCode}, `, res_payload);
		}
	});

}).listen(env.port, (err) => {
	log(`Node running in the '${env.envName}' mode/environment`)
	log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + env.port);
});

const handler = {};

handler.login = (data, next) => {
	// if (async auth_db(headers.authentication)) {
	// 	await ok();
	// 	response.writeHead({ 'Set-cookie': `${cookie}; ${expiry_date};` })
	// 	next(307, { 'location': `/${location}` })
	// }
}

handler.logout = (data, next) => {

}

// Sample handler
handler.sample = function (data, next) {
	// Send back a HTTP code and a 'res' payload
	next({
		res_payload: { 'handler name': 'sample handler' }
	});
	// next();
};

// Not found handler
handler.notFound = function (data, next) {
	next(404);
};


// Define the request router
const router = {
	'sample': handler.sample,
	'login': handler.login,
	'logout': handler.logout,
};
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);