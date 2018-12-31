'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Ques: Why return/resolve values are not needed for route handlers and call to next function not needed?
	Ans: For the definitions of the route handlers, there is no need to return anything or to
	create or return any Promises. Because in the server module, the route handler is called
	with the 'await' keyword, meaning that even if the routeHandler is not a Promise or does
	not return a Promise, the await keyword will convert the returned value to a Resolved Promise.
*/

// Dependencies
const router = require('./router');

// Function for setting a new route and its handler into the router HashMap
const setHandler = (method, route, handler) => router[method][route] = handler;

module.exports.route = setHandler; // The generic route and handler setter.
// Below are the function wrappers for setHandler function with the specified verb.
module.exports.post = (route, handler) => setHandler('POST', route, handler);
module.exports.get = (route, handler) => setHandler('GET', route, handler);
module.exports.put = (route, handler) => setHandler('PUT', route, handler);
module.exports.del = (route, handler) => setHandler('DEL', route, handler);

