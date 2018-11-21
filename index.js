'use strict'; // Enforce use of strict verion of JavaScript


// Dependencies
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	// Get URL and parse it
	let parsedUrl = url.parse(req.url, true);
	
	// Get the path
	let path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
	_log(path);

	// Respond back to the client
	res.write('Hi');
}).listen(PORT, (err) => {
	_log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + PORT);
})

const _log = (str) => console.log(str);