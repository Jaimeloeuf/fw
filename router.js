'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const handler = require('./handlers');

// Define the request router
const router = {
	'sample': handler.sample,
	'login': handler.login,
	'logout': handler.logout,
};
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);

module.exports = router;