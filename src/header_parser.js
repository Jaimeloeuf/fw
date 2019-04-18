'use strict'; // Enforce use of strict verion of JavaScript

module.exports = function header_parser(req) {
	// Destructure headers property out from the request object
	const { headers } = req;
	// Construct an object using the header properties and return it
	// @Ques: Should the object be returned, or attached to ctx, and return ctx instead.
	return {
		headers,
		contentType: header["content-type"],
		userAgent: header['user-agent'],
		cookies: header['cookies'],
	}
}

// Below is a function wrapper that garuntees that ctx will be returned even if the input function doesn't return anything
function wrapper(ctx, fn) {
	// Temporarily store the return value of the function
	let r_val = fn(ctx);
	// Return ctx if nothing is returned
	return (r_val === undefined) ? ctx : r_val;
}