'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module takes in the ctx object and fills it up with any incoming request message
	payloads before resolving back with the same ctx object instance.
	
	@TODO
	Use node buffer instead of strings.
	See if the max_size can be changed dynamically by route Handlers depending on what route it is
	Look into how the error handling will work in this case with the ctx thing
*/

// Dependencies
const decoder = new (require('string_decoder').StringDecoder);

// Try to determine what the usual file size is, and do like a 2 times the size as a safe overhead
const max_size = 1e6; // 1e6 means 1MB

// Module to handle incoming requests
var buffer; // HEY WHAT??? WHy this here? How does it seperate for different requests???
module.exports = (ctx) => {
	return new Promise((resolve, reject) => {
		buffer = ''; // Reset/clear buffer
		ctx.req
			// .on('data', data => buffer += decoder.write(data))
			.on('data', newData(data))
			.on('error', error => reject(error))
			.on('end', () => {
				// If no payload, then 'end' event is fired immediately
				if (buffer)
					ctx.req_body = buffer + decoder.end(); // Flush out decoder buffer if 'buffer' not null
				else
					ctx.req_body = undefined; // Make sure that req_body is undefined if current buffer is empty
				resolve(ctx); // Resolve with 'ctx' for the next function in 'then' chaining
			});

		/*	Out of the 2 function declaration methods, I'm using the arrow function, because if I'm not
			wrong, the arrow function will inherit and share the same lexical scope as the parent scope.
			Which will allow it to access 'buffer' directly? Not exactly clear on this yet.  */
		// function newData(data) {
		const newData = (data) => {
			buffer += decoder.write(data)
			if (buffer.length > max_size) {
				ctx.statusCode = 413;
				ctx.newError('Post entity too big');
				
				// Decide if I should resolve or reject this error
				resolve(ctx); // Resolve and let finalHandler deal with the error
				reject(ctx); // Reject and ask finalHandler send back a 500
			}
		}
	});
}