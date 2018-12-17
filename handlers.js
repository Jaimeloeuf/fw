'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module contains all the defintions for generic handlers for the router to call, and it also imports
	all the other handlers in their seperate modules like the 'auth' handler / module, in order to create the
	handlers object and export all of it as one handler object to the router.
*/

// Dependencies
const jwt = require('jsonwebtoken');

const handler = {};

var _user = {
	'GET': (ctx) => {

	},
	'POST': (ctx) => {

	},
	'PUT': (ctx) => {

	},
	'DEL': (ctx) => {

	}
};

// Mock user
const user = {
	id: 1,
	username: 'brad',
	email: 'brad@gmail.com'
}

const log = (dat) => console.log(dat);

handler.login = (ctx) => {
	// Do the db shit then get back the user to create token. To refactor the create token code too.
	return new Promise((resolve, reject) => {
		jwt.sign({ user }, 'secretkey', { expiresIn: '1000s' }, (err, token) => {
			if (err)
				reject(err);
			// ctx.res.write(JSON.stringify(token));
			// ctx.res.setHeader({Auth: token});
			ctx.res_body.token = token; // Write token to response body to be sent back in the finalHandler
			resolve(ctx);
		});
	});
};

handler.user = (ctx) => {
	getToken(ctx); // Sync call to get the token out of headers
	return new Promise((resolve, reject) => {
		jwt.verify(ctx.token, 'secretkey', (err, authData) => {
			if (err) {
				ctx.statusCode = 403; // Forbidden
				ctx.res_body.error = 'Forbidden, invalid auth';
				// reject(err); // Don't reject as it is not a code/logic error, but a user error
				resolve(ctx);
			}
			else {
				// Send back the details the client requested for
				ctx.res_body.message = 'Post created...';
				ctx.res_body.authData = authData; // Probs not going to send this back to the user
				resolve(ctx);
			}
		});

	})
}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function getToken(ctx) {
	const bearerHeader = ctx.headers['authorization']; // Get auth header value
	if (typeof bearerHeader === 'undefined') // Check if bearer is undefined
		ctx.res.statusCode = 403; // Forbidden
	const bearerToken = bearerHeader.split(' ')[1]; // Split at the space and Get token from array
	ctx.token = bearerToken; // Set the token
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