'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const decoder = new (require('string_decoder').StringDecoder);
const parser = require('./parser');

// Module to handle incoming requests
var buffer;
module.exports = getPayload;
function getPayload(ctx) {
	return new Promise((resolve, reject) => {
		buffer = ''; // Reset/clear buffer
		ctx.req
			.on('data', data => buffer += decoder.write(data))
			.on('error', error => reject(error))
			.on('end', () => {
				// If no payload, then 'end' event is fired immediately
				// If buffer is not empty
				if (buffer) {
					buffer += decoder.end(); // Returns any remaining input stored in internal buffer.
					// Call parser to Parse and Add payload from request object, into the context object 'ctx'
					parser(ctx, buffer);
				}
				else {
					// Should this be left empty or put as null?
					// Because if I dont set it, then when accessing the data, it should be a undefined by default
					ctx.req_payload = undefined;
				}
				resolve(ctx);
			});
	});
}

function getPayload2(ctx) {
	// Async function without proper sequencing.
	// Deprecated by the new getPayload function with promises.

	// Get the payload if any
	buffer = ''; // Reset/clear buffer
	ctx.req
		.on('data', data => buffer += decoder.write(data))
		.on('error', error => log(error))
		.on('end', () => {
			// If no payload, then 'end' event is fired immediately
			// If buffer is not empty
			if (buffer) {
				buffer += decoder.end(); // Returns any remaining input stored in internal buffer.
				// Parse and Add payload in buffer from request object, into the context object 'ctx'
				ctx.req_payload = parser(ctx, buffer);
			}
			else
				// Should this be left empty or put as null?
				// Because if I dont set it, then when accessing the data, it should be a undefined by default
				ctx.req_payload = undefined;
		});
}