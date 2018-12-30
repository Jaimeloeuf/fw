'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module contains all the defintions for generic handlers for the router to call, and it also imports
	all the other handlers in their seperate modules like the 'auth' handler / module, in order to create the
	handlers object and export all of it as one handler object to the router.

	The functions/handlers defined in this file will be available to to anyone using this as a framework.
*/

// Dependencies
const { createToken, verify } = require('./token');

const handlers = {};


handlers.login = (ctx) => {
	return createToken(ctx);
};

handlers.user = (ctx) => {
	return verify(ctx);
}

// Login handler
// handlers.login = (ctx) => {
// 	// if (async auth_db(headers.authentication)) {
// 	// 	await ok();
// 	// 	Add cookie to Headers of Response object
// 	// 	ctx.res_headers.cookie = { 'Set-cookie': `${cookie}; ${expiry_date};` }
// 	// 	next(307, { 'location': `/${location}` })
// 	// }
// 	return ctx; // To trigger the next .then method
// };
// logout handler
handlers.logout = (ctx) => {

};

// Sample handler using 'ctx'
handlers.sample = (ctx) => {
	// Send back a HTTP code and a 'res' payload
	ctx.setStatusCode(201);
	ctx.res_body = { 'handler name': 'sample handler' };
};

// Example code below to test out the idea
// Sample handler to test returning a Promise using 'ctx'
handlers.sample2 = (ctx) => {
	// Send back a HTTP code and a 'res' payload
	return new Promise((resolve, reject) => {
		ctx.setStatusCode(201);
		ctx.res_body = { 'handler name': 'sample handler' };

		// Call to DB...... need to wait
		ctx.res_body.data = db.getData(ctx.req_payload.userID);
		if (ctx.res_body.data) // If data is not undefined
			return resolve(ctx); // To trigger the next .then method
		return reject('ERROR: Cannot retrieve data from database, user dont exist');
	});
};


// Ping handler to see if server is up, nothing needs to be done as status code 200 is the default value
handlers.ping = (ctx) => {
	// statusCode does need to be set since 200 is the default value
	// But by setting it once, I technically 'freeze' it and prevent it from being set to other values
	ctx.setStatusCode(200); // Send back a HTTP code to indicate server is up
};

// Handler that will test the server's functionality when called and return a diagnostic report when done.
handlers.test = (ctx) => {
	// Admin privilleges / permissions are needed to use this handler
	// Verify identity with JWT or Auth method? It will depend on whether this server is a service or identity provider.
	// If identity provider that provides JWT, then user needs to get the JWT first and then call this route

	// Include the currnt config of the environment as part of the diagnostics
	ctx.res_body.env = env;

	// Test all the db connection for this specific service/server
};

// Not found handler
handlers.notFound = (ctx) => {
	ctx.setStatusCode(404); // Send back the HTTP code to indicate route not defined
};

// Invalid request Method handler
handlers.invalidReqMethod = (ctx) => {
	ctx.setStatusCode(501); // Send back the HTTP code to indicate request method not accepted
};

handlers.forbidden = (ctx) => {
	// User has authenticated, but does not have permission for the route requested.
	// E.g. A user using client crendentials to request for a admin page.

	ctx.setStatusCode(403);
};

module.exports = handlers;