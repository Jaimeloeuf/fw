'use strict'; // Enforce use of strict verion of JavaScript

const handler = {};

handler.user = (ctx) => {

};

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

// Authenticate a token or username + password??
// This is more like a username + password than a auth token way already
const authenticate = (user) => {
	// 1) Should return a true or false indicating success or failure of Auth OR,
	// 2) Call the next mw / callback in the cycle if success and reject if failure

	return new Promise((resolve, reject) => {
		/* 
			query db for user with the given username.
			if db returns user object or interface to read the user object in database
			call hashing method in the child process/worker to hash the given password.
			since abv method will be a 'await' call, when it returns, check if
			the hash matches the hash from the userObj from the DB exactly

			resolve if matches, and have a promise chain that allows thenables and
			call the next 'middleware'
		*/
		
	});
};

// Login handler
handler.login = (ctx) => {
	// if (async auth_db(headers.authentication)) {
	// 	await ok();
	// 	Add cookie to Headers of Response object
	// 	ctx.res_headers.cookie = { 'Set-cookie': `${cookie}; ${expiry_date};` }
	// 	next(307, { 'location': `/${location}` })
	// }
	return ctx; // To trigger the next .then method
};
// logout handler
handler.logout = (ctx) => {

	return ctx; // To trigger the next .then method
};

// Search API handler
handler.search = () => {
	/*
		Assumes that the incoming request in formulated nicely
		OR,
		pass the incoming request through a pure funcion, where it is smth like ctx module that will extract all
		info about the search request out in a nice format for processing.
	*/
}

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
	ctx.statusCode = 404; // Send back a HTTP code to indicate route not defined
	return ctx; // To trigger the next .then method
};

module.exports = handler;