'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { getCTX } = require('./ctx');
const getPayload = require('./req_payload');
const parser = require('./parser');
const router = require('./router');
const finalHandler = require('./finalHandler');
const { debug } = require('./utils');

/*	@DOC Flow of logic:
	0. Parse req object with getCTX()
	Promises Logic flow:
	1. Get incoming req payload, when the getPayload Promise resolves after receiving full payload
	2. parser is called to Parse and save payload into 'ctx', when parser resolves
	3. Get a route handler from router and route the 'ctx' to handler
	4. Handle the req with the given ctx, when route-handler/middleware is done,
	5. Call finalHandler and send response back to user
	
	@TODO
	Perhaps modify CTX agn by adding in a error object, for finalHandler to deal with
	Problem is there is no more code that will run for a req after the 'catch' method
*/

// unifiedServer used to handle requests from both the HTTP and HTTPS server in the future
module.exports = (req, res) => {
	// Create 'ctx' object with (req, res) objects
	const ctx = getCTX(req, res);

	// In promise land, the moment 1 promise rejects, then all the following .thens are skipped
	// It goes straight to the trailing .catch instead

	// Get payload and sequence all the Async code
	// Meaning concurreny and parrallelism combined!
	getPayload(ctx)
		.then((ctx) => parser(ctx))
		.then((ctx) => router(ctx)(ctx))
		.then((ctx) => finalHandler(ctx))
		.then((ctx) => debug.logout_params(ctx))
		.catch((err) => {
			ctx.newError(err);
			debug.logout_params(ctx);
		});
}