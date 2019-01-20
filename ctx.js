'use strict'; // Enforce use of strict verion of JavaScript

/* @Doc
	Copying koa.js idea on using a Ctx object
	Where Ctx is an object containing both the req and res objects and
	data parsed from the given 'req,res' objects.
	It exposes a easy to use and clean interface for letting data flow downstream in the
	request/response and middleware lifecycle, with many commonly used methods built in.
*/

// Dependencies
const url = require('url'); // Used to parse the url from the request object.

// Ctx class is used to create the 'ctx' object.
class Ctx {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		/* Parsing data out from the request object */
		// Parsed url objects
		this.url = url.parse(req.url, true);
		// Get the path. Remove '/' from the start and the end, but keep those in the middle.
		this.path = this.url.pathname.replace(/^\/+|\/+$/g, '');
		// Get the request method, make all upper case for consistency
		this.method = req.method.toUpperCase();
		// Get headers as an object
		this.headers = req.headers;
		// Get the userAgent for route handlers to use
		this.userAgent = this.headers['user-agent'];
		// Get the contentType of the incoming req payload, to be used for parsing the payload
		this.contentType = this.headers["content-type"];
		// Method for comparing a given content type with the content type of the request object.
		this.checkContentType = (type) => type === this.contentType;
		// Get the query string as an object
		this.query = this.url.query;
		// Get the cookies in the headers  @TODO implement a method to deal with the cookies above.
		// cookies: getCookies(req.headers['cookie']),

		/* All things from the req object should be frozen after having their values set unlike the response objects */
		// Should the user and middleware be allowed to change the data parsed from the request object and stored in the ctx obj?

		/* Setting Defaults for response object */
		// Default must haves for the response headers, add more by defining new Key/Value pairs
		this.res_headers = {
			// Should I change this into a function that calls res.setHeader method? So that node can cache the header
			// internally for me instead of me keeping a record in the 'ctx' object
			'content-type': 'application/json', // Default response of API server should be in JSON
			'cache-control': 'no-cache', // The default cache-control should be changed to suite the needs of prod env
			'X-Powered-By': 'Electricity and Wires', // Easter egg Joke to kinda confuse pen-testers :)
			'content-length': 0, // MUST be set by finalHandler else client will hang as it waits for the server
		};
		// Method to set content length header in the response message. Must be called by finalHandler module
		this.setContentLength = (body) => this.res_headers['content-length'] = Buffer.byteLength(body);
		// Initialize the response body message to be an empty object. Add more by defining new Key/Value pairs
		this.res_body = {};
		// @TODO to test and improve on the res_cookies below
		this.res_cookies = [];
		// Method for adding more cookies to the array of cookies
		// this.newCookie = (cookie) => this.res_cookies.push(cookie);

		// Any middleware can add its error output to this error object which will be logged tgt at the end.
		this.error = [];
		// Method to push new error into the error array.
		this.newError = (err) => this.error.push(err);
	}

	// Method to set status code for the response. Can only be called once else an error will be pushed into error array.
	setStatusCode(code) {
		// Set value and prevent this property from being modified again.
		try { Object.defineProperty(this, 'statusCode', { value: code, writable: false }); }
		catch (err) { this.newError(err); } // Error will be thrown if this method called more than once.
	};

	// Method for setting statusCode, use this method to set the statusCode and lock the value in after use.
	stop() {
		// Set value and prevent this property from being modified again.
		try { Object.defineProperty(this, 'continue', { value: false, writable: false }); }
		catch (err) { this.newError(err); } // Error will be thrown if this method called more than once.
		// Technically the abv catch block will nvr happen as the value that is being written is always the same,
		// Thus in a sense the value is never redifined and thus no error will be thrown.
	};
};
// The default status code returned to the client is 200 and this property cannot be deleted
Object.defineProperty(Ctx.prototype, 'statusCode', { configurable: false, value: '200' });
// Property to allow functions to check if execution should continue. Initial state is true and property cannot be deleted.
Object.defineProperty(Ctx.prototype, 'continue', { configurable: false, value: true });


/* With this design, the code in the handler will execute finnish first before it enters finalHandler, and the finalHandler
	will then deal with this redirect. */
// Call this function if a redirect is needed, this function will put the url into the response header, you can also set if you want to continue and allow other functions to continue execution
function redirect(url, redirect_type = 307, cont = true) {
	ctx.res_headers.Location = url;
	ctx.setStatusCode(redirect_type);
	console.log(`Redirecting req to ${url}`); // logging activity
}

// Returns an object with all the cookies
function getCookies(cookie) {
	cookie = cookie.split('=');
	let cookies;
	for (let i = 0; i < cookie.length; i += 2) {
		let val = cookie[i + 1].split(';');
		cookies[cookie[i]] = {
			val: val[0],
			secure: false,
			httponly: false,
			exp: 100000000
		}
		for (let j = 0; j < val.length; j++) {
			let dat = val[j].toLowerCase();
			switch (dat) {
				case 'secure':
					cookies[cookie[i]].secure = true;
					break;
				case 'httponly':
					cookies[cookie[i]].httponly = true;
					break;
				case 'exp':

				default:
					log('Invalid param for cookies');
			}
		}
	}
}

// Need to export here instead of directly, because the Object.defineProperty needs to access the Class first
module.exports = Ctx;