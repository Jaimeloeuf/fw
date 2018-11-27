'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { env } = require('./config');
const http = require('http');
const { getCTX } = require('./ctx');
const decoder = new (require('string_decoder').StringDecoder);
const router = require('./router');
const { log, debug } = require('./utils');

const httpServer = http.createServer((req, res) => unifiedServer(req, res))
	.listen(env.port, (err) => {
	log(`Node running in the '${env.envName}' mode/environment`)
	log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + env.port);
});

// unifiedServer used to handle requests from both the HTTP and HTTPS server in the future
function unifiedServer(req, res) {
	/*	Flow of logic:
	Parse req object with getCTX()
	Route the 'ctx' object to a handler as defined in the router
	handle the req with the given ctx, before
	calling the final handler of the req and end the response to the user
	*/

	// Create 'ctx' object with (req, res) objects
	let ctx = getCTX(req, res);
	debug.logout_req_params(ctx);

	// Get the payload if any
	let buffer = '';
	req.on('data', data => buffer += decoder.write(data));

	// If there is no payload, the 'end' event is fired immediately
	req.on('end', () => {
		buffer += decoder.end(); // Returns any remaining input stored in internal buffer.

		// Log payload if any
		if (buffer) {
			// Parse buffer of JSON format
			buffer = (req.headers["content-type"] === 'application/json') ? JSON.parse(buffer) : buffer
			log('Payload Received: ', buffer);
		}
		// Add payload in buffer from request object into the context object 'ctx'
		ctx.req_payload = buffer || undefined;

		// Get a route handler from router and route the ctx to handler
		router(ctx.path)(ctx, finalHandler);

		/*	This anonymous inner funciton is the 'next' function called in the handlers.
			This function is the final handler, also known as finalHandler in the Express world.
			@TODO Refactor this function out into a seperate module like what Express did
 		*/
		function finalHandler({ statusCode = 200, res_payload = {} } = {}) {
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
}