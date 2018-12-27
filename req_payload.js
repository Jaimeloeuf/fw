'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module takes in the ctx object and fills it up with any incoming request message
	payloads before resolving back with the same ctx object instance.
	
	@TODO
	Use node buffer instead of strings.
	See if the max_size can be changed dynamically by route Handlers depending on what route it is
	Look into how the error handling will work in this case with the ctx thing

	user buffer and use streams instead. Pipe the input into smth rather than add one by one
*/

// Dependencies
const decoder = new (require('string_decoder').StringDecoder);

// Try to determine what the usual file size is, and do like a 2 times the size as a safe overhead
// Perhaps allow this value to be read from the config module
const max_size = 1e6; // 1e6 means 1MB

var num = 0;
// Module to handle incoming requests
var buffer; // HEY WHAT??? WHy this here? How does it seperate for different requests???
module.exports = (ctx) =>
	new Promise((resolve, reject) => {
		buffer = ''; // Reset/clear buffer
		ctx.req
			// .on('error', (error) => reject(error)) // Reject with the error since this is a server error
			.on('error', (error) => {
				console.log(buffer.length)
				return reject(error)
			}) // Reject with the error since this is a server error
			.on('data', function newData(data) {
				if (buffer.length < max_size)
					buffer += decoder.write(data);
				else {
					console.log(`Length here: ${buffer.length}`);
					console.log(`called in exceed size, ${++num}`)
					ctx.req.pause();

					ctx.setStatusCode(413); // Set HTTP status code for 'entity too large'
					buffer = ''; // Clear/delete the received data in the buffer
					ctx.req.emit('error', 'Post entity too big'); // Emit the error event

					// Technically it is not a normal event but a stream instead
					// ctx.req.destroy('Post entity too big'); // Destroy the readable stream

					/*	return reject();
						Reject with error msg since the execution should not continue with this error
						Since the entity too big, I did not receive the full message, thus the request should not
						continue, and I should thus resolve, but set the 
						Reject and ask let finalHandler deal with the error n send back a 500	*/
				}
			})
			.on('end', () => {
				// If no payload, then 'end' event is fired immediately
				if (buffer)
					ctx.req_body = buffer + decoder.end(); // Flush out decoder buffer if 'buffer' not null
				else
					// is this actually needed???
					ctx.req_body = undefined; // Make sure that req_body is undefined if current buffer is empty
				return resolve();
			});

		/*	Arrow functions are used here, because they will inherit the scope from its parent's functional block
			Which will allow it to access 'buffer' directly? Not exactly clear on this yet.  */
	});


// function newData(data) {
// 				buffer += decoder.write(data)
// 				console.log(`Length here: ${buffer.length}`);
// 				if (buffer.length > max_size) {
// 					ctx.setStatusCode(413);
// 					// Technically it is not a normal event but a stream instead
// 					console.log('called in exceed size')
// 					// ctx.req.destroy('Post entity too big'); // Destroy the readable stream

// 					return reject('Post entity too big');
// 					/*	Reject with error msg since the execution should not continue with this error
// 						Since the entity too big, I did not receive the full message, thus the request should not
// 						continue, and I should thus resolve, but set the 
// 						Reject and ask let finalHandler deal with the error n send back a 500	*/
// 				}
// 			}

// module.exports = (ctx) => {
// 	return new Promise((resolve, reject) => {
// 		buffer = ctx.req_body = ''; // Reset/clear req_body property that will act as the buffer.
// 		ctx.req
// 			.on('error', (error) => reject(error)) // Reject with the error since this is a server error
// 			.on('data', (data) => {
// 				buffer += decoder.write(data); // Add the new data to the buffer
// 				if (buffer.length > max_size) {
// 					ctx.statusCode(413);
// 					ctx.newError('Post entity too big');
// 					// Reject with error msg since the execution should not continue with this error
// 					return reject('Post entity too big');
// 					/*
// 					Since the entity too big, I did not receive the full message, thus the request should not
// 					continue, and I should thus resolve, but set the 
// 					Reject and ask let finalHandler deal with the error n send back a 500
// 				*/
// 				}
// 			})
// 			.on('end', () => {
// 				// If no payload, then 'end' event is fired immediately
// 				if (buffer)
// 					ctx.req_body = buffer + decoder.end(); // Flush out decoder buffer if 'buffer' not null
// 				else
// 					ctx.req_body = undefined; // Make sure that req_body is undefined if current buffer is empty
// 				return resolve(ctx); // Resolve with 'ctx' for the next function in 'then' chaining
// 			});

// 		/*	Arrow functions are used here, because they will inherit the scope from its parent's functional block
// 			Which will allow it to access 'buffer' directly? Not exactly clear on this yet.  */
// 	});
// }

