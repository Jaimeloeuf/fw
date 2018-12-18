'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module contains all the defintions for generic handlers for the router to call, and it also imports
	all the other handlers in their seperate modules like the 'auth' handler / module, in order to create the
	handlers object and export all of it as one handler object to the router.
*/

// Dependencies
const { createToken, verify } = require('./auth');

const handler = {};

handler.login = (ctx) => {
	return createToken(ctx);
};

handler.user = (ctx) => {
	return verify(ctx);
}


// Login handler
// handler.login = (ctx) => {
// 	// if (async auth_db(headers.authentication)) {
// 	// 	await ok();
// 	// 	Add cookie to Headers of Response object
// 	// 	ctx.res_headers.cookie = { 'Set-cookie': `${cookie}; ${expiry_date};` }
// 	// 	next(307, { 'location': `/${location}` })
// 	// }
// 	return ctx; // To trigger the next .then method
// };
// logout handler
handler.logout = (ctx) => {

	return ctx; // To trigger the next .then method
};

// Sample handler using 'ctx'
handler.sample = (ctx) => {
	// Send back a HTTP code and a 'res' payload
	ctx.statusCode = 201;
	ctx.res_body = { 'handler name': 'sample handler' };
	return ctx; // To trigger the next .then method
};

// Example code below to test out the idea
// Sample handler to test returning a Promise using 'ctx'
handler.sample2 = (ctx) => {
	// Send back a HTTP code and a 'res' payload
	return new Promise((resolve, reject) => {
		ctx.statusCode = 201;
		ctx.res_body = { 'handler name': 'sample handler' };

		// Call to DB...... need to wait
		ctx.res_body.data = db.getData(ctx.req_payload.userID);
		if (ctx.res_body.data) // If data is not undefined
			return resolve(ctx); // To trigger the next .then method
		return reject('ERROR: Cannot retrieve data from database, user dont exist');
	});
};

// Ping handler to see if server is up
handler.ping = (ctx) => {
	// Actually the statusCode does need to be set, as 200 is the default value
	ctx.statusCode = 200; // Send back a HTTP code to indicate server is up
	return ctx; // To trigger the next .then method
};

// Not found handler
handler.notFound = (ctx) => {
	ctx.statusCode = 404; // Send back the HTTP code to indicate route not defined
	return ctx; // To trigger the next .then method
};

// Invalid request Method handler
handler.invalidReqMethod = (ctx) => {
	ctx.statusCode = 501; // Send back the HTTP code to indicate request method not accepted
	return ctx; // To trigger the next .then method
};

module.exports = handler;