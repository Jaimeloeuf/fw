'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This library module will handle the create/read/sign/verify operations on a given token
	This does not handle and authentication. Just token based Identity verification

	@TODO
	- look into private Keys and stuff like Asymmetric signing and verifying
	- Create child processes too, to deal with the parsing and signing as it seems like it
	will take quite abit of CPU power
*/

// Dependencies
const jwt = require('jsonwebtoken'); // External dependency from NPM by Auth0

// Mock user for testing purposes only
const user = {
	id: 1,
	username: 'brad',
	email: 'brad@gmail.com'
}

// Variables used for signing/verifying tokens
const expiresAfter = '100s';
const signageKey = 'secret';

// Simplified console.log method
const log = (dat) => console.log(dat);

module.exports.createToken = (ctx) => {
	// Do the db shit then get back the user to create token. To refactor the create token code too.
	return new Promise((resolve, reject) => {
		jwt.sign(user, signageKey, { expiresIn: expiresAfter }, (err, token) => {
			if (err)
				reject(err); // Reject as it is internal error.

			// Write token into a cookie for finalHandler to send back to client
			// How do I erase the previously issused cookie stored on the client?
			ctx.res_headers['Set-Cookie'] = token;
			resolve(ctx);
		});
	});
}

/*
Verify is to verify the token and send back the decrypted token

The callback is called with the decoded payload if the signature is valid and optional
expiration, audience, or issuer are valid. If not, it will be called with the error.
*/
module.exports.verify = (ctx) => {
	getToken(ctx); // Sync call to get the token out of headers
	return new Promise((resolve, reject) => {

		// Pass in the JWT from the user, the key used to sign the tokens and a callback function
		jwt.verify(ctx.token, signageKey, (err, decoded_token) => {
			if (err) {
				ctx.statusCode = 401; // Forbidden
				ctx.newError('Forbidden, invalid auth');

				// if (err === 'invalid audience') // Only true if you add a audience field in the options object
					// ctx.setStatusCode(40??)

				// Error will not be rejected as it is not a code/server/logic error, but a client side error
			}
			else {
				// After reading/decrypting the token
				// Send the token back to function caller

				// Send back the details the client requested for
				ctx.res_body.message = 'Successfully verified';
				ctx.res_body.authData = decoded_token; // Probs not going to send this back to the user
			}
			resolve(ctx); // Resolve with ctx regardless of errors or success.
		});

	})
}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function getToken(ctx) {
	ctx.token = ctx.headers['authorization'].split(' ')[1]; // Split at the space and Get token from array
	if (typeof ctx.token === 'undefined') // Check if bearer is undefined
		ctx.statusCode = 401; // If token does not exist or not sent over, respond with a 401 auth-token not provided


	// if (ctx.token === undefined) // Check if bearer is undefined
	// 	ctx.statusCode = 403; // Forbidden
}