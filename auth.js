'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	- This module will handle all authentication to the DataBase
	- This Auth Module deals with BCrypt and child process to hash and
	verify usernames plus passwords, while the token or JWT module is in
	charge of cookie/JWT action after the initial password authentication.

	@TODO
	- Search how to use Node JS Child processes / Clusters to do authentication on another 'thread'
*/

// Test function to make sure 'crypto' support is avail on current machine.
var crypto;
try {
	crypto = require('crypto');
} catch (err) {
	log('crypto support is disabled!');
}

// Authenticate username + password only. Does not deal with tokens here
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