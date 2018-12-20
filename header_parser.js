'use strict'; // Enforce use of strict verion of JavaScript

// 'Global' variable to store a direct reference to req.headers for a easier and quicker access method
var h;
function he(req) {
	h = req.headers
	return {
		headers: h,
		contentType: h["content-type"],
		userAgent: h['user-agent'],
		cookies: h['cookies'],
	}
}

let r_val;
function wrapper(ctx, fn) {
	r_val = fn(ctx);
	return (r_val === undefined) ? ctx : r_val;
}