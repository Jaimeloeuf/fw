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