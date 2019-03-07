'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module contains all the defintions for generic handlers for the router or app to use.
	The functions/handlers defined in this file will be available to to anyone using this as a framework.

	the framework is unopinionated, thus users can override these handlers

	Only the ping route handler is attached to the '/ping' route on the router. The rest of these handlers are
	given to the user to allow the user to attach them if they would like and also to provide a sample on how
	the handlers are written and what can be done with them

	Recommended routes and handlers to create:
	- /diagnostics
		- Diagnostics route to request server to perform diagnostics and return report to user.
	- /test
		- Test route similiar to /ping route, but allow client to request the server to run on all tests on
		  itself before generating a test report and pass that as response back to the client.
*/

// Ping handler to see if server is up, nothing needs to be done as status code 200 is the default value
function ping(ctx) {
	// statusCode need not be set since 200 is the default value, however by setting it once, the property is frozen/unchangeable
	// ctx.setStatusCode(200); // Send back a HTTP code to indicate server is up


	// For now the /ping route will be used to test with a Sample handler using 'ctx'
	// Send back a HTTP code and a 'res' payload
	ctx.setStatusCode(201);
	ctx.res_body = { 'handler name': 'sample handler' };
};

// Not found handler. To override for custom 404 page..
const notFound = (ctx) => ctx.setStatusCode(404);

// Invalid request Method handler
function invalidReqMethod(ctx) {
	// HTTP code 501 for request method not implemented.
	ctx.setStatusCode(501);
	// Set headers to indicate accepted request methods
	ctx.res_headers['accepted-methods'] = 'GET, POST, PUT, DEL';
};

/* Forbidden route, route handler for given auth token, where the User
has authenticated, but does not have permission for the route requested.
E.g. A user using client crendentials to request for a admin page. */
const forbidden = (ctx) => ctx.setStatusCode(403);

module.exports = { ping, notFound, invalidReqMethod, forbidden };