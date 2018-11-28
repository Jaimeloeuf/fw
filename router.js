'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const handler = require('./handlers');

// Define the request router
const router = {
	'sample': handler.sample,
	'ping': handler.ping,
	'login': handler.login,
	'logout': handler.logout,
};
// const router = new Map([
// 	['login', handlers.login],
// 	['logout', handlers.logout],
// ]);


// Check the router object/hashmap with route for a handler.
// If none defined, use the notFound handler.
module.exports = ctx => (router[ctx.path]) ? router[ctx.path] : handler.notFound;