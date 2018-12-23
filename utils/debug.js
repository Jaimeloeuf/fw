'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module exports a function to allow me to debug by logging out information of the req/res objects
*/

// Dependencies
const log = require('./log');

// const { envName } = require('./config').env;
// if current 'env' is 'production' Allow debug object to still be used, but to log to a error logging service instead?


module.exports = {
	console_lines(n) {
		// Print out 'n' number of dashes on the console, used to seperate stuff
		while (--n) // A reverse while loop, more efficient than the old for loop
			write('-');
		write('\n');
	},

	logout_params(ctx) {
		// Debug middleware to log out details from ctx object
		debug.console_lines(90);
		// Items from Req obj
		log(`Requested path: '${ctx.path}'`);
		log(`Request method: '${ctx.method}'`);
		log('Queries received in url = ', ctx.query);
		log('Headers received = ', ctx.headers);
		if (ctx.req_body)	// Log req_body if any
			log('Request Body: ', ctx.req_body);
		debug.console_lines(60);
		// Items from Res obj
		log(`Response status code: ${ctx.statusCode}`);
		log('Response Headers are = ', ctx.res_headers);
		log('Response Body: ', ctx.res_body);
		debug.console_lines(60);
		// Log Error if any
		if (ctx.error.length)
			log('Errors in error array for current ctx:\n', ctx.error);
	}
};