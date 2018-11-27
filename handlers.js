'use strict'; // Enforce use of strict verion of JavaScript

const handler = {};

// Login handler
handler.login = (ctx, next) => {
	// if (async auth_db(headers.authentication)) {
	// 	await ok();
	// 	response.writeHead({ 'Set-cookie': `${cookie}; ${expiry_date};` })
	// 	next(307, { 'location': `/${location}` })
	// }
}
// logout handler
handler.logout = (ctx, next) => {

}

// Sample handler
handler.sample = function (ctx, next) {
	// Send back a HTTP code and a 'res' payload
	next({
		res_payload: { 'handler name': 'sample handler' }
	});
	// next();
};

// Ping handler to see if server is up
handler.ping = function (ctx, next) {
	next(200); // Indicate server is still up
};

// Not found handler
handler.notFound = function (ctx, next) {
	next(404);
};

module.exports = handler;