'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const unifiedServer = require('./server');
const { env } = require('./config');
const { print, log_error } = require('./utils/utils');

/* @TODO
	Should I replace all the process.exit() calls?
	ALso learn how to use process.nextTick() for seeing performance and to help with optimization
*/

// Attach event listeners and handlers to the Process.
process
	.on('beforeExit', (code) => print(`Exit code: ${code}`))
	.on('exit', (code) => print(`Exit code: ${code}`))
	.on('uncaughtException', log_error);

// Instantiating HTTP Server, passing a function to handle incoming req/res objects and attaching event listeners/handlers to the server
http.createServer(unifiedServer)
	.listen(env.port, (err) => {
		print(`Node running in the '${env.envName}' mode/environment`)
		print(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + env.port);
		if (err)
			process.exit(); // Will this prevent above line to execute? Should I set process.exitCode instead?
	})
	.on('error', (err) => {
		print(err)
		process.exit(); // Will this prevent above line to execute? Should I set process.exitCode instead?
	})
	.on('clientError', (err, socket) => {
		if (err) log_error(err);
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n'); // Close socket gracefully with a 400 HTTP error
	})
	.on('close', () => {
		// Last actions before the server closes. Perhaps send a close success/error signal back to process caller?
		print('Server closing');
		process.exit(); // Will this prevent above line to execute? Should I set process.exitCode instead?
	});