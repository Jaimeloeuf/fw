'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const handler = require('./handlers');

// Define the request router
const router = {
	'sample': handler.sample,
	'ping': handler.ping,
	'login': handler.login,
	'logout': handler.logout,
};
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);

/*
Perhaps I should have different routers for different request methods as for the same route, different request methods should be handled differently, ideally with different route handlers.

One of the routers should be for when the routes specified within, handles all requests for that route the same way regardless of request method.
^ Think through the above again to see if it is logical, for stricter API request control, shouldn't I clearly seperate all the things base on their request method and not allow stray random reqest methods / requests with wrong request method go through?
*/

// Code below are a tmp testing implementation of the above idea. To work on further.
// The module exports has been commented out for now to prevent module call conflict
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

// module.exports = {
// 	GET: GET,
// 	POST: POST,
// 	PUT: PUT,
// 	DEL: DEL
// }


// Check the router object/hashmap with route for a handler.
// If none defined, use the notFound handler.
module.exports = (ctx) => router[ctx.path] ? router[ctx.path] : handler.notFound;