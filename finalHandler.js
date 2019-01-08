'use strict'; // Enforce use of strict verion of JavaScript

/*	This function is just like the finalHandler in the Express world.

	@DOC Flow of logic in 'finalHandler':
	- Serialize res_body and store result in itself, a variable that is created on
	destructuring the 'ctx' object. Only the variable is changed, meaning the value
	in ctx.res_body called directly is unaffected/unchanged.
	- Set the content length in the response headers with the method from 'ctx' object.
	- Sent the response headers and status code back to the client
	- Sent the response payload back to client and close the connection.
	
	@TODO
	How do I serialize res_body and make it into a readable stream to pipe it into 'res' writable stream
	Maybe allow one more option in the handler to specify if they want the payload to be serialized
	
	Add some features for finalHandler to deal with the error(s) in 'ctx' object, if it is a client or there
	is client errors inside the error array of the ctx object, send it back to the client as part of the response
	message. Have a hashmap of predefined error messages in JSON format.
	Only send back the error to the client if the error is a 400 range client type of error.
	If the error is a 500 based server error, just send back the status code without any message body
	and log the errors in the error array without sending them to the user.
*/

// Dependencies
const { debug } = require('./utils/utils');
const { envName } = require('./config').env;

// const finalHandler = (ctx) => { // Which function declaration should I 
function finalHandler(ctx) {
	// Extract the response body out from the 'ctx' object
	let { res_body } = ctx;
	// Stringfy response body and use setContentLength method to set content length of body in the headers.
	ctx.setContentLength(res_body = JSON.stringify(res_body));
	// If there are errors and status code less than the error codes, respond with a 500 internal error code.
	ctx.res.writeHead((ctx.error.length && ctx.statusCode < 400) ? 500 : ctx.statusCode, ctx.res_headers);
	// Send the message body back to the client and end the connection
	ctx.res.end(res_body);
}

var reqCount = 0; // Global variable to track number of completed requests. Used in devMode only
function devMode(ctx) {
	finalHandler(ctx); // Call the res, finalHandler
	// Do all the logging and stuff here
	console.log(`Servicing req number: ${++reqCount}`); // Count the nummber of requests serviced
	console.timeEnd('Cycle time'); // Time taken for full req/res cycle including time for logging/debugging above
	debug.logout_params(ctx); // Log out the ctx object for debugging
	console.log('Mem usage', (process.memoryUsage().rss / 1024 / 1024).toFixed(3)); // In MB
}

/*	Auto choose a 'finalHandler' based on current environment mode.
	For production mode, just export the finalHandler.
	For developement environment, add a wrapper function around finalHandler
	to call the debuggin and logging stuff after finalHandler is called.
*/
module.exports = (envName === 'dev') ? devMode : finalHandler;

/*	Referring to code below:
	Alternative method for setting headers, as node caches the headers internally
	and not write them directly to the client, res.getHeaders() can be called
	to see what are the headers set before sending them out. This method should
	be used when you need to modify/access the headers after setting them. E.g.
	when you set headers in a middleware but only use writeHead in the finalHandler
*/
// for (let header in res_headers)
// 	res.setHeader(header, res_headers[header]);
// res.writeHead(ctx.statusCode);