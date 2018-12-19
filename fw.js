'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const router = require('./router');

const routeHandler = (method, route, handler) => router[method][route] = handler;

module.exports.get = (route, handler) => routeHandler('GET', route, handler);
module.exports.post = (route, handler) => routeHandler('POST', route, handler);
module.exports.put = (route, handler) => routeHandler('PUT', route, handler);
module.exports.del = (route, handler) => routeHandler('DEL', route, handler);

module.exports.route = routeHandler;