'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const handler = require('./handlers');

// Routers for different request method named as such
const GET = {
	'sample': handler.sample,
	'ping': handler.ping
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
		return router[ctx.path] ? router[ctx.path] : handler.notFound;
	// If no such router for request method, use the invalidReqMethod handler to deal with the request.
	return handler.invalidReqMethod;
};

/* Hashmap implementation of the router.
@TODO test to see which one is better, object or hashmap? for further optimization in the future */
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);