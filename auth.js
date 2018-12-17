'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module will handle all authentication with all the auth-related code here

	@TODO
	- Search how to use Node JS Child processes / Clusters to do authentication on another 'thread'
*/

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


// Dependencies
const jwt = require('jsonwebtoken');

// Mock user
const user = {
	id: 1,
	username: 'brad',
	email: 'brad@gmail.com'
}

const log = (dat) => console.log(dat);



module.exports.createToken = (ctx) => {
	// Do the db shit then get back the user to create token. To refactor the create token code too.
	return new Promise((resolve, reject) => {
		jwt.sign({ user }, 'secretkey', { expiresIn: '1000s' }, (err, token) => {
			if (err)
				reject(err);
			// ctx.res.write(JSON.stringify(token));
			// ctx.res.setHeader({Auth: token});
			ctx.res_body.token = token; // Write token to response body to be sent back in the finalHandler
			ctx.res_headers['Set-Cookie'] = token;
			resolve(ctx);
		});
	});
}

module.exports.verify = (ctx) => {
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
var header;
// function getToken(ctx) {
// 	header = ctx.headers['authorization']; // Get auth header value
// 	if (header === 'undefined')
// 		log('hi')
// 	if (typeof header === 'undefined') // Check if bearer is undefined
// 		ctx.statusCode = 403; // Forbidden
// 	const bearerToken = bearerHeader.split(' ')[1]; // Split at the space and Get token from array
// 	ctx.token = bearerToken; // Set the token
// }

function getToken(ctx) {
	return new Promise((resolve, reject) => {
		header = ctx.headers['authorization']; // Get auth header value
		if (header === 'undefined')
			reject('No auth header found');
		if (typeof header === 'undefined') // Check if bearer is undefined
			ctx.statusCode = 403; // Forbidden
		const bearerToken = header.split(' ')[1]; // Split at the space and Get token from array
		ctx.token = bearerToken; // Set the token
		resolve(ctx);
	});
}