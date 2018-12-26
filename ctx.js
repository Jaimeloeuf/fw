'use strict'; // Enforce use of strict verion of JavaScript

/* @Doc
	Copying koa.js idea on using a ctx object
	Where ctx is an object containing both the req and res objects and
	data parsed from those 'req,res' objects.
	It exposes a easy to use and clean interface for passing data downstream
	in a middleware lifecycle, with many commonly used built in methods.

	@TODO
	This is currently a Factory function for 'ctx' object
	Should I change this factory function into a Class,
	with prototypes to extend its functionailty/capability
	Learn how to use function prototypes like below:
	getCTX.prototype.req = req;
*/

// Dependencies
const url = require('url');

// How to use the new class method.
// const ctx = new CTX(req, res);

class CTX {
	constructor(req, res) {
		this.req = req;
		this.res = res;
		this.continue = true;

		// Parsed url object
		this.url = url.parse(req.url, true); // To freeze
		// Get the path. Remove / from the start and the end, but keep those in the middle.
		this.path = this.url.pathname.replace(/^\/+|\/+$/g, ''); // To freeze
		// Get the request method, make all upper case for consistency
		this.method = req.method.toUpperCase(); // To freeze
		// Get headers as an object
		this.headers = req.headers; // To freeze

		// Get the contentType of the incoming req payload, to be used for parsing the payload
		this.contentType = req.headers["content-type"]; // To freeze this.
		// Method to check if content-type of incoming req payload is equals to given type
		// Get the query string as an object
		this.query = parsedUrl.query; // To freeze
		// Get the cookies in the headers
		// cookies: getCookies(req.headers['cookie']),
		// @TODO implement a method to deal with the cookies above.
		this.auth = req.headers['authorization']; // To freeze
		// token: req.headers.cookie, // Tmp way to get the JWT token stored as a cookie


		/* All things from the req object should be frozen unlike the response objects */


		// Setting Defaults for response object
		this.res_headers = {
			'content-type': 'application/json', // Default response of API server should be in JSON
			'cache-control': 'no-cache', // The default cache-control should be changed to suite the needs of prod env
			'content-length': 0, // MUST be set by finalHandler else client will hang as it waits for the server
		};
		this.res_body = {};

		// @TODO to test and improve on the res_cookies below
		this.res_cookies = [];


		// Any middleware can add its error output to this error object which will be logged tgt at the end.
		this.error = [];
		// Method to push new error into the error array.
		setStatusCode = (code) => {
			try {
				Object.defineProperty(this, 'statusCode', {
					// Set value and prevent this property from being modified again.
					writable: false,
					value: code
				});

			} catch (err) {
				log(err, '\nError: Status code has already been set, cannot set it again.');
			}
		};

		checkContentType = (type) => type === this.contentType;
		// Is the arrow function okay since I am using the this keyword??
		setContentLength = (body) => this.res_headers['content-length'] = Buffer.byteLength(body); // Arrow func implementation of abv
		newCookie = (cookie) => this.res_cookies.push(cookie);
		newError = (err) => this.error.push(err);
	}

	// setStatusCode = (code) => {
};

// The default status code returned to the client
Object.defineProperty(CTX.prototype, 'statusCode', { configurable: false, value: '200' });




/*	Global var:
	Create once, store many times. Prevent variable creation every single time getCTX method is called
	Function can use this variable created at program startup by overwrite the value every single time */
var parsedUrl;

const getCTX = (req, res) => {
	// Get URL and parse it, parse query strings if any in url
	parsedUrl = url.parse(req.url, true);

	// @TODO create a new Header parser module that parses the request heaeders and returns its value to ctx module
	// h = getHeaders(req);

	// Construct and return ctx object
	return {
		req: req,
		res: res,
		continue: true, // Indicator if the functions shohuld continue execution. Certain functions like finalHandler can ignore this value.

		// Parsed url object
		url: parsedUrl,
		// Get the path. Remove / from the start and the end, but keep those in the middle.
		path: parsedUrl.pathname.replace(/^\/+|\/+$/g, ''),
		// Get the request method, make all upper case for consistency
		method: req.method.toUpperCase(),
		// Get headers as an object
		headers: req.headers,
		// headers: h.headers,
		// User Agent header for analytics

		// Get the contentType of the incoming req payload, to be used for parsing the payload
		contentType: req.headers["content-type"],
		// Method to check if content-type of incoming req payload is equals to given type
		checkContentType: (type) => type === req.headers["content-type"],
		// Get the query string as an object
		query: parsedUrl.query,
		// Get the cookies in the headers
		// cookies: getCookies(req.headers['cookie']),
		// @TODO implement a method to deal with the cookies above.
		auth: req.headers['authorization'],
		// token: req.headers.cookie, // Tmp way to get the JWT token stored as a cookie


		// Setting Defaults for response object
		statusCode: 200, // Make this read only
		setStatusCode: (code) => this.statusCode = code,
		res_headers: {
			'content-type': 'application/json', // Default response of API server should be in JSON
			'cache-control': 'no-cache', // The default cache-control should be changed to suite the needs of prod env
			'content-length': 0, // MUST be set by finalHandler else client will hang as it waits for the server
		},
		// setContentLength: function (body) { return this.res_headers['content-length'] = Buffer.byteLength(body); },
		setContentLength: (body) => this.res_headers['content-length'] = Buffer.byteLength(body), // Arrow func implementation of abv
		// Is the arrow function okay since I am using the this keyword??
		res_body: {},

		// @TODO to test and improve on the res_cookies below
		res_cookies: [],
		newCookie(cookie) {
			this.res_cookies.push(cookie);
		},

		// Any middleware can add its error output to this error object which will be logged tgt at the end.
		error: [],
		// Method to push new error into the error array.
		newError(err) { this.error.push(err); }
	};
}


/* With this design, the code in the handler will execute finnish first before it enters finalHandler, and the finalHandler
	will then deal with this redirect. */
function redirect(url, redirect_type = 307, cont = true) {
	ctx.res_headers.Location = url;
	ctx.statusCode = redirect_type; // Smth to prevent this from being changed once set.
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





module.exports = CTX;