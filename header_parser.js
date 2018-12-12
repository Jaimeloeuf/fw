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

// Should I really seperate out this into a seperate module