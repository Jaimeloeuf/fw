'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module takes in the ctx object and fills it up with any incoming request message
	payloads before resolving back with the same ctx object instance.

	On 413 error in the data stream:
	If the entity is too big the full message will not be received, thus the req/res cycle should not continue
	as the request is not completely built. let finalHandler deal with the error n send back a 500
	
	@TODO
	Use node buffer instead of strings.
	See if the max_size can be changed dynamically by route Handlers depending on what route it is
	Look into how the error handling will work in this case with the ctx thing
	user buffer and use streams instead. Pipe the input into smth rather than add one by one

	Should a new Decoder be spawned for every new request?
	Because if the same decoder is used for all requests, the data in the buffer may be mixed up?
	See how it is done in pirple and see how it is usually done elsewhere. If streams and buffers
	are used in the future, this might become unneccessary soon.
*/

// Dependencies
const decoder = new (require('string_decoder').StringDecoder);

// Determine the usual message size, and add a safe overhead to it. Perhaps allow this value to be read from the config module
const max_size = 1e6; // 1e6 means 1MB

// Module to handle incoming requests
module.exports = (ctx) =>
	new Promise((resolve, reject) => {
		ctx.req_body = ''; // Reset/clear the req_body property of ctx.
		ctx.req // Add event handlers to the request stream
			.on('error', (error) => reject(error)) // Reject with the error since this is a server error
			.on('data', (data) => {
				ctx.req_body += decoder.write(data); // Decode and add the buffered data chunk
				if (ctx.req_body.length > max_size) {
					// If the size of the incoming body is too large,
					ctx.req.pause(); // Stops/Pauses the incoming stream from emitting data events.
					ctx.req_body = ''; // Clear/delete the received data in the ctx object.
					ctx.setStatusCode(413); // Set HTTP status code for 'entity too large'
					ctx.req.emit('error', 'Post entity too big'); // Use 'error' event to Reject Promise
				}
			})
			.on('end', () => {
				// If no payload, then 'end' event is fired immediately
				if (ctx.req_body)
					ctx.req_body += decoder.end(); // Flush out decoder buffer and edd a end symbol if 'buffer' not null
				// else // If the request body is empty
				// 	ctx.req_body = undefined; // Make sure that req_body is undefined if current buffer is empty
				return resolve();
			});
	});

// var buffer; // HEY WHAT??? WHy this here? How does it seperate for different requests???
// module.exports = (ctx) =>
// 	new Promise((resolve, reject) => {
// 		buffer = ''; // Reset/clear buffer
// 		ctx.req
// 			// .on('error', (error) => reject(error)) // Reject with the error since this is a server error
// 			.on('error', (error) => {
// 				console.log(buffer.length)
// 				return reject(error)
// 			}) // Reject with the error since this is a server error
// 			.on('data', (data) => {
// 				if (buffer.length < max_size)
// 					buffer += decoder.write(data);
// 				else {
// 					console.log(`Length here: ${buffer.length}`);
// 					console.log(`called in exceed size, ${++num}`)
// 					ctx.req.pause(); // Stops/Pauses the incoming stream from emitting data eventn

// 					ctx.setStatusCode(413); // Set HTTP status code for 'entity too large'
// 					buffer = ''; // Clear/delete the received data in the buffer
// 					ctx.req.emit('error', 'Post entity too big'); // Emit the error event

// 					// Technically it is not a normal event but a stream instead
// 					// ctx.req.destroy('Post entity too big'); // Destroy the readable stream

// 					/*	return reject();
// 						Reject with error msg since the execution should not continue with this error
// 						Since the entity too big, I did not receive the full message, thus the request should not
// 						continue, and I should thus resolve, but set the 
// 						Reject and ask let finalHandler deal with the error n send back a 500	*/
// 				}
// 			})
// 			.on('end', () => {
// 				// If no payload, then 'end' event is fired immediately
// 				if (buffer)
// 					ctx.req_body = buffer + decoder.end(); // Flush out decoder buffer if 'buffer' not null
// 				else
// 					// is this actually needed???
// 					ctx.req_body = undefined; // Make sure that req_body is undefined if current buffer is empty
// 				return resolve();
// 			});
// 	});