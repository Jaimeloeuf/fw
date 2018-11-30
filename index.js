'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const http = require('http');
const unifiedServer = require('./server');
const { env } = require('./config');
const { log } = require('./utils');

/* @TODO
	Perhaps add the process.on uncaught error? or process.on exit?
	ALso learn how to use process.nextTick() for seeing performance and to help with optimization
*/

http.createServer(unifiedServer)
	.listen(env.port, (err) => {
		log(`Node running in the '${env.envName}' mode/environment`)
		log(((err) ? 'Error, server cannot listen on port: ' : 'Server listening on port: ') + env.port);
		if (err)
			process.exit();
	})
	.on('error', (err) => {
		log(err)
		process.exit();
	})
	.on('clientError', (err, socket) => {
		if (err) log(err);
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
	})
	.on('close', () => {
		// Last actions before the server closes. Perhaps send a close success/error signal back to process caller?
		log('Server closed');
		process.exit();
	});