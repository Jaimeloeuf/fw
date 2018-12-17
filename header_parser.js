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

// Deal with the JWT Token here?
// ctx.token = token.split(' ')[1]
function verifyJWT(ctx, next) {
	// Get auth in header
	token = ctx.token;
	if (token) {

	}
	else
		finalHandler(403);
}

jwt.verify(token, secretKey, (err, AuthData) => {
	if (err)
		finalHandler(403);

});


let r_val;
function wrapper(ctx, fn) {
	r_val = fn(ctx);
	return (r_val === undefined) ? ctx : r_val;
}

// Should I really seperate out this into a seperate module