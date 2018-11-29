'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const { env } = require('./config');
const { getCTX } = require('./ctx');
const getPayload = require('./req_payload');
const parser = require('./parser');
const router = require('./router');
const finalHandler = require('./finalHandler');
const { log, debug } = require('./utils');

// Perhaps add the process.on uncaught error? or process.on exit?
// ALso learn how to use process.nextTick() for seeing performance and to help with optimization

http.createServer(unifiedServer)
	.listen(env.port, (err) => {
		log(`Node running in the '${env.envName}' mode/environment`)
		log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + env.port);
		if (err)
			process.exit();
	})
	.on('error', (err) => {
		log(err)
		process.exit();
	})
	.on('clientError', (err, socket) => {
		if (err) log(err);
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
	})
	.on('close', () => {
		// Last actions before the server closes. Perhaps send a close success/error signal back to process caller?
		log('Server closed');
	});

// unifiedServer used to handle requests from both the HTTP and HTTPS server in the future
function unifiedServer(req, res) {
	/*	@DOC Flow of logic:
		0. Parse req object with getCTX()
		Promises Logic flow:
		1. Get incoming req payload, when the getPayload Promise resolves after receiving full payload
		2. parser is called to Parse and save payload into 'ctx', when parser resolves
		3. Get a route handler from router and route the 'ctx' to handler
		4. Handle the req with the given ctx, when route-handler/middleware is done,
		5. Call finalHandler and send response back to user	*/

	// Create 'ctx' object with (req, res) objects
	const ctx = getCTX(req, res);

	getPayload(ctx)
		.then((ctx) => parser(ctx))
		.then((ctx) => router(ctx)(ctx))
		.then((ctx) => finalHandler(ctx))
		.then((ctx) => debug.logout_params(ctx))
		.catch((error) => log(error));
	// Perhaps modify CTX agn by adding in a error object, for finalHandler to deal with
	// Problem is there is no more code that will run for a req after the 'catch' method
}