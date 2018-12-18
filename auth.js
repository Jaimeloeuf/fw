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


/* TO seperate this out into a JWT module, so auth Module deals with
	BCrypt and child process to hash and verify usernames plus passwords,
	while JWT module is in charge of the cookie/JWT action after the
	initial password authentication.
	
	Perhaps the JWT module can have child processes too, to deal with the
	parsing and signing as it seems like it will take quite abit of CPU power
	
	Also look into private Keys and stuff like Asymmetric signing and verifying */
module.exports.createToken = (ctx) => {
	// Do the db shit then get back the user to create token. To refactor the create token code too.
	return new Promise((resolve, reject) => {
		jwt.sign({ user }, 'secretkey', { expiresIn: '100s' }, (err, token) => {
			if (err)
				reject(err);

			// Write token into a cookie for finalHandler to send back to client
			// How do I erase the previously issused cookie stored on the client?
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
function getToken(ctx) {
	ctx.token = ctx.headers['authorization'].split(' ')[1]; // Split at the space and Get token from array
	if (typeof ctx.token === 'undefined') // Check if bearer is undefined
		ctx.statusCode = 403; // Forbidden
	
	// if (ctx.token === undefined) // Check if bearer is undefined
	// 	ctx.statusCode = 403; // Forbidden
}