'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This router module exports the router function
	The router function takes in a ctx object, where it will,
	1) Route it to the router that matches the request method
	2) Returns a handler that is either associated with the given route,
		or returns the 404 not found handler.
*/

// Dependencies
const handler = require('./handlers');

// Routers for different request method named as such
const GET = {
	'sample': handler.sample,
	'ping': handler.ping,
	'user': handler.user,
	'user/<hex: userID>': handler.user
}

const POST = {
	'login': handler.login,
	'logout': handler.logout
}

const PUT = {
}

const DEL = {
}

// 'Routers' object to store all the routers for different request methods
const routers = {
	GET: GET,
	POST: POST,
	PUT: PUT,
	DEL: DEL
}

var router; // Global variable, 'create once and use many times' for below
module.exports = (ctx) => {
	// Get a router based on the request method
	router = routers[ctx.method];
	/* If the request method is valid with a valid router
	Check the router object/hashmap with the request route for a handler.
	If none defined, use the notFound handler. */
	if (router)
		return router[ctx.path] || handler.notFound; // Using OR operator, not sure if this work, needs testing
	// return router[ctx.path] ? router[ctx.path] : handler.notFound; // Using ternary operator

	// If no such router for request method, use the invalidReqMethod handler to deal with the request.
	return handler.invalidReqMethod;
};

/* Hashmap implementation of the router.
@TODO test to see which one is better, object or hashmap? for further optimization in the future */
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);


const lg = (d) => console.log(d); // Simplified console log
var totest = 'F34';
isHex(totest);
function isHex(hex) {
	let b10 = parseInt(hex, 16); // Convert to base 10
	// See if the base 10 value converted back to base 16 matches the input.
	return (b10.toString(16) === hex.toLowerCase()) ? b10 : false;
}

function getDynamicRoute(ctx) {
	// find the prototype based on the ctx.path
	// Extract and store the variables into the req_params property of ctx object.

	ctx.req_params = { ...variables }; // Spread the variables thing in here??
	ctx.req_params = variables; // Why not just directly write to ctx.req_params

	return handler || handler.notFound; // Return the handler found, else return the notFound handler
	// Should above line be here or be inside the main router function.
}

// Second router to test the new idea of having seperate routers for static and dynamic routes
module.exports.router2 = (ctx) => {
	/*	Get a static routes router based on the request method
		Don't need to check if request method is a valid verb as it is checked at ctx object creation
		If none defined, use the notFound handler. */
	routers[ctx.method][ctx.path] || getDynamicRoute(ctx); // If no static routes, call the dynamic routes, alse call the notfound

	return handler.invalidReqMethod; // Technically this should still be assigned to the server
	/*	when a invalid request method comes in:
		Stop and prevent the next function from getting payload
		Skip the parsing module automatically as the req body is empty
		Why not just set the value of req_body to be null and prevent write access to the object property
		then getPayload will throw an error
		So need to prevent that from throwing an error, possible to ask the req_payload to check if it the
		property is forzen? If it is frozen then skip the whole chunk.
	*/
};