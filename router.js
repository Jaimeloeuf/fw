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


const lg = (d) => console.log(d);

var totest = 'F34';

function isHex(hex) {
	let b10 = parseInt(hex, 16); // Convert to base 10
	// See if the base 10 value converted back to base 16 matches the input.
	return (b10.toString(16) === hex.toLowerCase()) ? b10 : false;
}


/*	Total of 2 'routers'
	- Router for all static URIs
	- Router for dynamic URIs
*/


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