'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const decoder = new (require('string_decoder').StringDecoder);

// Module to handle incoming requests
var buffer;
module.exports = (ctx) => {
	return new Promise((resolve, reject) => {
		buffer = ''; // Reset/clear buffer
		ctx.req
			.on('data', data => buffer += decoder.write(data))
			.on('error', error => reject(error))
			.on('end', () => {
				// If no payload, then 'end' event is fired immediately
				if (buffer)
					ctx.req_payload = buffer + decoder.end(); // Flush out decoder buffer if 'buffer' not null
				else
					ctx.req_payload = undefined; // Make sure that req_payload is undefined if current buffer is empty
				resolve(ctx); // Resolve with 'ctx' for the next function in 'then' chaining
			});
	});
}