'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const { env } = require('./config');
const { getCTX } = require('./ctx');
const getPayload = require('./req_payload');
const parser = require('./parser');
const router = require('./router');
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
	/*	Flow of logic:
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

// This function is the final handler, also known as finalHandler in the Express world.
function finalHandler(ctx) {
	let { res_payload } = ctx;
	ctx.setContentLength(res_payload = JSON.stringify(res_payload));
	ctx.res.writeHead(ctx.statusCode, ctx.res_headers);
	ctx.res.end(res_payload);
	return ctx; // To trigger the next .then method

	/* @TODO
	How do I serialize res_payload and make it into a readable stream to pipe it into 'res' writable stream
	Maybe allow one more option in the handler to specify if they want the payload to be serialized
	Perhaps refactor this function out into a seperate module like what Express did	*/
}