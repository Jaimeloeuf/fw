'use strict'; // Enforce use of strict verion of JavaScript

const handler = {};

// Login handler
handler.login = (ctx) => {
	// if (async auth_db(headers.authentication)) {
	// 	await ok();
	// 	Add cookie to Headers of Response object
	// 	ctx.res_headers.cookie = { 'Set-cookie': `${cookie}; ${expiry_date};` }
	// 	next(307, { 'location': `/${location}` })
	// }
	return ctx; // To trigger the next .then method
}
// logout handler
handler.logout = (ctx) => {

	return ctx; // To trigger the next .then method
}

// Sample handler using 'ctx'
handler.sample = (ctx) => {
	// Send back a HTTP code and a 'res' payload
	ctx.statusCode = 201;
	ctx.res_payload = { 'handler name': 'sample handler' };
	return ctx; // To trigger the next .then method
};

// Ping handler to see if server is up
handler.ping = (ctx) => {
	// Actually the statusCode does need to be set, as 200 is the default value
	ctx.statusCode = 200; // Send back a HTTP code to indicate server is up
	return ctx; // To trigger the next .then method
};

// Not found handler
handler.notFound = (ctx) => {
	ctx.statusCode = 404; // Send back a HTTP code to indicate route not defined
	return ctx; // To trigger the next .then method
};

module.exports = handler;