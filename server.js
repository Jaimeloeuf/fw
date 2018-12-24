'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const { getCTX } = require('./ctx');
const getPayload = require('./req_payload');
const bodyParser = require('./body_parser');
const router = require('./router');
const finalHandler = require('./finalHandler');

/* 	@Doc Flow of logic:
	0. Parse req object with getCTX()
	0.1. All async codes are sequenced with Promise chaining

	Promises Logic flow:
	1. Call getPayload to get incoming req payload, when the getPayload Promise resolves after receiving full payload
	2. parser is called to Parse and save payload into 'ctx', when parser resolves
	3. Get a route handler from router and route the 'ctx' to handler
	4. Handle the req with the given ctx, when route-handler/middleware is done,
	5. Call finalHandler and send response back to user
	@Note_to_self: Does the above somehow mean concurreny and parrallelism? See more on this.

	@Notes / @Doc
	Exported function is the unifiedServer used to handle requests from both HTTP and HTTPS server.
	In promise land when 1 promise rejects, all the '.then' calls are
	skipped and the trailing '.catch' method is called instead.
	The .catch method will set the error received into the ctx object which is scoped to the
	entire function, and let the flow continue to finalHandler. So the finalHandler will deal
	with any errors that occured too.
	There is no input value for the function in finally() call
	The last '.catch' is called if '.finally' call throws any error.

	@TODO
	Add some features for finalHandler to deal with the error(s) in 'ctx' object
	See if it is feasible to make the unifiedServer function into an async function, using async/await

	To update this module to fix the Promise waterfall. Make it so that 'finally' is where I handle both
	responses to client, and client errors such as 404 should be sent back to the client.
	I should use async/await on getCTX, so that I can do the chaining thing better as .catch
	method does not resolve back ctx.
*/

// Convert avail memory from bytyes to MB and round to 2 d.p.
console.log(`Total memory for process: ${(require('v8').getHeapStatistics().total_available_size / 1024 / 1024).toFixed(2)}MB`);

module.exports = (req, res) => {
	// Create a new 'ctx' object with (req, res) objects
	console.time('Cycle time'); // For dev-env only
	const ctx = getCTX(req, res);  // @Note_to_self Should I use const or let/var? Will variable be overwritten during concurrent requests?

	// Promise Chaining to respond back to client
	getPayload(ctx)
		.then((ctx) => bodyParser(ctx))
		.then((ctx) => router(ctx)(ctx))
		.catch((err) => ctx.newError(err)) // perhaps set the status code to 500?
		.finally(() => finalHandler(ctx))
		.catch((err) => console.error(err)); // @TODO change this to use the universal logging and error collection method
}

module.exports = async (req, res) => {
	// Create a new 'ctx' object with (req, res) objects
	console.time('Cycle time'); // For dev-env only
	const ctx = getCTX(req, res);  // @Note_to_self Should I use const or let/var? Will variable be overwritten during concurrent requests?

	try {
		await getPayload(ctx);
		await bodyParser(ctx);
		await router(ctx)(ctx); // Get a route Handler from the router and call the handler

	} catch (err) {
		ctx.newError(err); // perhaps set the status code to 500?
	}
	finalHandler(ctx)
		.catch((err) => console.error(err));
		// @TODO change above to use the universal logging and error collection method
}