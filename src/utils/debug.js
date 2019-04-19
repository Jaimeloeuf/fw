'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module exports a function to allow me to debug by logging out information of the req/res objects
*/

const print = console.log;
const write = process.stdout.write;

// const { envName } = require('./config').env;
// if current 'env' is 'production' Log debug object to a error logging service instead.


module.exports = {
	console_lines(n) {
		// Print out 'n' number of dashes on the console, used to seperate stuff
		while (--n) // A reverse while loop, more efficient than the old for loop
			write('-');
		write('\n');
	},

	logout_params(ctx) {
		// Debug middleware to print out details from ctx object
		this.console_lines(90);
		// Items from Req obj
		print(`Requested path: '${ctx.path}'`);
		print(`Request method: '${ctx.method}'`);
		print('Queries received in url = ', ctx.query);
		print('Headers received = ', ctx.headers);
		if (ctx.req_body)	// print req_body if any
			print('Request Body: ', ctx.req_body);
		this.console_lines(60);
		// Items from Res obj
		print(`Response status code: ${ctx.statusCode}`);
		print('Response Headers are = ', ctx.res_headers);
		print('Response Body: ', ctx.res_body);
		this.console_lines(60);
		// print Error if any
		if (ctx.error.length)
			print(`${ctx.error.length} Errors in error array for current ctx:\n`, ctx.error);
	}
};