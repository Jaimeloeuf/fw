'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This router module exports the route function
	The route function takes in a ctx object to
	1) Route the request to the router for the given the request method
	2) Returns a handler that is either associated with the given route,
		or returns the 404 not found handler.
*/

// Dependencies
const handler = require('./handlers');

/* Router objects for different HTTP request methods. */

// GET router with some default route and handlers
const GET = {
	'ping': handler.ping,
}

// Empty objects for holding routes and their corresponding handlers
const POST = {}, PUT = {}, DEL = {};

// 'Routers' object to store all the routers for different request methods
const routers = { GET, POST, PUT, DEL, }

// Test to see if the Hashmap implementation of the router is better in terms of speed and code extensibility
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);

// Expose route module as the default import function
module.exports = (ctx) => {
	// Get a router based on the request method
	let router = routers[ctx.method];
	/* If the request method is valid with a valid router
	Check the router object/hashmap with the request route for a handler.
	If none defined, use the notFound handler. */
	if (router)
		return router[ctx.path] || handler.notFound; // Using OR operator, not sure if this work, needs testing
	// return router[ctx.path] ? router[ctx.path] : handler.notFound; // Using ternary operator

	// If no such router for request method, use the invalidReqMethod handler to deal with the request.
	return handler.invalidReqMethod;
};

function getDynamicRoute(ctx) {
	// find the prototype based on the ctx.path
	// Extract and store the variables into the req_params property of ctx object.

	ctx.req_params = { ...variables }; // Spread the variables thing in here??
	ctx.req_params = variables; // Why not just directly write to ctx.req_params

	return handler || handler.notFound; // Return the handler found, else return the notFound handler
	// Should above line be here or be inside the main router function.
}

/*	
	return handler.invalidReqMethod; // Technically this should still be assigned to the server
	^ when a invalid request method comes in:
	Stop and prevent the next function from getting payload
	Skip the parsing module automatically as the req body is empty
	Why not just set the value of req_body to be null and prevent write access to the object property
	then getPayload will throw an error
	So need to prevent that from throwing an error, possible to ask the req_payload to check if it the
	property is forzen? If it is frozen then skip the whole chunk.



	I have a router, that is a object that have key/value pairs.
	The keys are the route prototypes
	The values are the route handler for the route defined in the key

	The problem is that all the handlers have a standard input parameter/arguement list which
	is the ctx object. So when the server calls the handler function, it just needs to pass it the
	ctx object, which it has a referenc in the server module. So the other additional variables, how
	to send it to the route handler? I want it to be like flask, instead of Express when I still
	need to get those variables out from the ctx.req_params...

	So route handlers for static routes should always expect a single arguement of 'ctx' but for
	dynamic routes, they can expect 'ctx' as the first arguement, but followed will be the
	porameters that they specified in the route.

	What is the order that express middlewares are executed in?
	Can a middleware execute after the route handler

	Based on my design, the finalHandler is called right after the route handler ends.
*/

// Expected usage in the app file
// app.get('/user/<hex: userID>', (userID) => {
// 		console.log(userID);
// });

/*	Variable type:
	An error will be sent to the route handler. Should the app implement the errBack callback strategy?

	<>	Don't care, just pass whatever is found in this segment
	<int: ...> Int type expected, if everything matches but just type no match, then and
	<hex: ...> Hex expected, if everything matches but just type no match, then and
	<str: ...> String expected, if everything matches but just type no match, then and

	// Should queries be allowed? Should I just ban queries, especially queries in URL segments that are not the last segments
	//  So e.g. like a query url like -->  hostname:port/api/video?v=7/chunk
	// Should the abv be allowed or banned?
*/