'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const { env } = require('./config');
const { getCTX } = require('./ctx');
const getPayload = require('./req_payload');
const parser = require('./parser');
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
		.then((ctx) => debug.logout_req_params(ctx))
		.catch((error) => log(error));
	// Perhaps modify CTX agn by adding in a error object, for finalHandler to deal with
	// Problem is there is no more code that will run for a req after the 'catch' method
}

/*	This function is the final handler, also known as finalHandler in the Express world.
	@TODO Refactor this function out into a seperate module like what Express did	*/
function finalHandler(ctx) {
	let { res } = ctx;
	// res.setHeader(); // Should I set headers here? Like custom headers based on the handlers?
	res.writeHead(ctx.statusCode, { 'Content-Type': 'application/json' });

	// Convert res_payload to string and write it to the 'res' stream
	// Should this JSON serialization be done in the handler function? Or done here?
	// Maybe allow one more option in the handler to specify if they want the payload to be serialized
	res.end(JSON.stringify(ctx.res_payload));
	return ctx;
}