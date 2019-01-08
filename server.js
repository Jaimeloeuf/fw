'use strict'; // Enforce use of strict verion of JavaScript

/* 	@Doc:
	All async codes are sequenced with Promise chaining. 
	@Note_to_self: Does the above somehow mean concurreny and parrallelism? See more on this.

	Pseudo/Async Logic-flow/Sequence:
	1) Upon getting the request and response object from the server instance.
	2) Create a new 'ctx' object with the Ctx class and store it with const reference.
	3) Use getPayload function to read the full stream of data from the request object and store inside ctx.req_body property.
	4) Use body_parser module to parse the http message if it is encoded in JSON format for example.
	5) Call the router with the requested route in order to get a route handler.
	   The route handler function is called and it is a function that accepts the 'ctx' object as arguement.
	6) Call finalHandler to send response back to user.

	@Notes
	Exported function is the unifiedServer used to handle requests from both HTTP and HTTPS server.
	In promise land when 1 promise rejects, all the '.then' calls are
	skipped and the trailing '.catch' method is called instead.
	The .catch method will set the error received into the ctx object which is scoped to the
	entire function, and let the flow continue to finalHandler. So the finalHandler will deal
	with any errors that occured too.
	There is no input value for the function in finally() call
	The last '.catch' is called if '.finally' call throws any error.

	@TODO
	Change the error logging in the trycatch block to use a universal logging and error collection method
*/

// Dependencies
const Ctx = require('./ctx'); // Class to create new 'ctx' objects
const getPayload = require('./req_payload'); // Promise returning function for getting request body message.
const bodyParser = require('./body_parser'); // Promise returning function for parsing request body message.
const router = require('./router'); // Function/router for getting a route handler for a specific route.
const finalHandler = require('./finalHandler'); // Final route Handler for responding back to the client.

// At server start, display avail memory, and current memory usage. Convert avail memory from bytyes to MB and round to 2 d.p.
console.log(`Total memory for process: ${(require('v8').getHeapStatistics().total_available_size / 1024 / 1024).toFixed(2)}MB`);
console.log(`Current Mem usage: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(4)}MB`);

// module.exports = async (req, res) => {
module.exports.adufhahd = async (req, res) => {
	debug();
	const ctx = new Ctx(req, res); // Create a new 'ctx' object with the (req, res) objects.
	// @Note_to_self Should I use const or let/var? Will variable be overwritten during concurrent requests?

	try { // Main async block sequenced inside a try/catch block
		await getPayload(ctx);
		await bodyParser(ctx);
		await router(ctx)(ctx); // Get a route Handler from the router and call the handler immediately.
	} catch (err) { ctx.newError(err); } // Add error into the error array.

	try { finalHandler(ctx); } // Removed the await
	catch (err) { console.error(err); } // For any error, just log it out, as not possible to respond to the client.
}

// Promise
// 	.resolve(finalHandler(ctx))
// 	.catch(console.error) // catch any errors, technically the try catch block is good for catching erros so can test both out first


const server5 = async (req, res) => {
	debug();
	const ctx = await new Ctx(req, res); // Create a new 'ctx' object with the (req, res) objects.
	// @Note_to_self Should I use const or let/var? Will variable be overwritten during concurrent requests?

	ctx.on('stop', () => {
		console.log('hi')
		finalHandler(ctx);
	});

	try { // Main async block sequenced inside a try/catch block
		await getPayload(ctx);
		await bodyParser(ctx);
		await router(ctx)(ctx); // Get a route Handler from the router and call the handler immediately.
	} catch (err) { ctx.newError(err); } // Add error into the error array.

	try { finalHandler(ctx); } // Removed the await
	catch (err) { console.error(err); } // For any error, just log it out, as not possible to respond to the client.
}

function debug() {
	// console.log('new req!'); // Debug log
	console.time('Cycle time'); // To keep track of time needed per req/res cycle // For dev-env only.
}


module.exports = server5;