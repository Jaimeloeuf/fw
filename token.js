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

// Mock user for testing purposes only. @TODO Remove this code
const user = {
	id: 1,
	username: 'brad',
	email: 'brad@gmail.com'
}

// Variables used for signing/verifying tokens. Should be read from env or config file.
const expiresAfter = '100s';
const signageKey = 'secret';

// Function caller to provide data for JWT creation. An optional parameter setToken that defaults to true, used to put token into cookies.
module.exports.createToken = (ctx, setToken = true, cookie = true) =>
	new Promise((resolve, reject) => {
		// Instead of signing 'user', sign ctx.jwt
		jwt.sign(user, signageKey, { expiresIn: expiresAfter }, (err, token) => {
			if (err)
				return reject(err); // Reject as it is internal error.

			/* 	Dealing with tokens:
			Write token into a cookie for finalHandler to send back to client
			How do I erase the previously issused cookie stored on the client? */
			if (setToken)
				ctx.res_headers['Set-Cookie'] = token;
			return resolve();
		});
	});

/*
Verify is to verify the token produce the decrypted token

The callback is called with the decoded payload if the signature is valid and optional
expiration, audience, or issuer are valid. Else, it will be called with the error.
*/
module.exports.verify = (ctx) =>
	new Promise((resolve, reject) => {
		getToken(ctx) // Get token out of headers into ctx.token property

		// Pass in the JWT from the user, the key used to sign the tokens and a callback function
		jwt.verify(ctx.token, signageKey, (err, decoded_token) => {
			if (err) {
				ctx.setStatusCode(403); // Forbidden
				ctx.newError('Forbidden, invalid auth');
				// if (err === 'invalid audience') // Only true if you add a audience field in the options object
				// ctx.setStatusCode(40??)
				// Error will not be rejected as it is not a code/server/logic error, but a client side error
				return resolve(false); // Since it is a client error, resolve with a 'false'
			}
			else
				ctx.JWT = decoded_token; // After decrypting the token, put data into 'ctx' object for function caller
			return resolve(true); // Resolve with true to indicate verification success
		});
	});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function getToken(ctx) {
	ctx.token = ctx.headers['authorization'].split(' ')[1]; // Split at space and Get token from array
	// if (typeof ctx.token === 'undefined') // Check if bearer is undefined
	// 	ctx.setStatusCode(401); // If token does not exist or not sent over, respond with a 401 auth-token not provided


	// Check if bearer is undefined
	if (typeof ctx.token === 'undefined') {
		ctx.setStatusCode(401); // If token does not exist or not sent over, respond with a 401 auth-token not provided
		ctx.stop(); // Stop execution if no token given and return faillure to function caller.
	}
}


/*	What should a JWT contain?   (The client holding on to the JWT will be referred to as the owner of the JWT)
	- The owner's Identity, basically declaring who the user is
	- What are the resources that the owner can access.
	- Who issused the JWT token to the user
	- And who is the JWT intended for? Meaning who or which microservice should accept the token?

	standard token


	headers:
		{
			"typ": "JWT",
			"alg": "HS256" // The algorithm used for the signature is HMAC SHA-256
		}
		{
			"exp": ,
			"iat": ,
			"expiresIn": ,
			"tokenType": "Bearer",
			"subject": "retrieve data", // What is the purpose of this token/request?
			"usrID": 578ec9,
			"usr": "john@gmail.com",
			"iss": "bouk.com", // Issuer of the token
			"aud": "bouk.com/", // Intended audience that should acccept the token


			"account type": "consumer", // The type of account that the user has
			"roles": {
				// The things/roles that the user is allowed to do
				"role": "consumer"
				"booking": "create"
			}
			"scope": ["read", "write", "update", "del"]

		}

*/



/* Below is my attempt of creating my own dependency less JWT module */

function createJWE(claims, headers) {
	if (!headers)
		headers = {
			// Standard default headers
			"typ": "JWT",
			"alg": "HS256" // The algorithm used for the signature is HMAC SHA-256
		}
	const payload = base64URLencode(headers) + "." + base64URLencode(claims);
	const signature = base64URLencode(HMACSHA256(payload, secret));
	return encrypt('RSA256', privateKey, payload + "." + signature); // Return the JWE back to function caller to send to the client to store

	// Shorter form of above by getting rid of the signature variable.
	return encrypt('RSA256', privateKey, payload + "." + base64URLencode(HMACSHA256(payload, secret))); 
}


/* To decrypt,
	1. Decrypt with private key
	2. Split the token into its 3 seperate parts
	3. Verify that the token's alg property in the header is the same as the one used by the server
	4. Hash the header + payload and check if it is the same as the given signature.
	5. Parse the payload into a JS object for the service to now use. */
function verify(JWE) {
	var JWT = dencrypt('RSA256', privateKey, JWE);
	JWT = JWT.split('.');
	if (JWT[0]['alg'] === 'HS256')
		if (HMACSHA256(JWT[0] + JWT[1], secret) === JWT[2])
			payload = JSON.parse(JWT[1]);
}

// Ver 2
function verify2(JWE, cb) {
	// Verify and get either an error or
	return new Promise((resolve, reject) => {
		var JWT = dencrypt('RSA256', privateKey, JWE);
		JWT = JWT.split('.');
		// Only allow HS256 as alg used. So none alg will be rejected
		if (JWT[0]['alg'] !== 'HS256')
			reject(new Error('Wrong alg specified in JWT header'));
		if (HMACSHA256(JWT[0] + JWT[1], secret) !== JWT[2])
			reject(new Error('The JWT has been tampered with!'));
		resolve(JSON.parse(JWT[1]));
	});
}

async function login() {
	try {
		let data = await verify2(JWE);
		let todos = await db.get_todos(data.userID);
		if (!todos)
			throw new Error('No todos for the user')
	} catch (err) {

	}
}