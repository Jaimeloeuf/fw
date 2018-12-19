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

const log = (dat) => console.log(dat);

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