'use strict'; // Enforce use of strict verion of JavaScript

// Dependencies
const router = require('./router');

const setHandler = (method, route, handler) => router[method][route] = fnModifier(handler);

module.exports.route = setHandler;

module.exports.post = (route, handler) => setHandler('POST', route, handler);
module.exports.get = (route, handler) => setHandler('GET', route, handler);
module.exports.put = (route, handler) => setHandler('PUT', route, handler);
module.exports.del = (route, handler) => setHandler('DEL', route, handler);


/*	fnModifier function  takes in a function and returns a function that has been modified to call
	the original function and return the ctx object. By using this modifier, the route handlers
	defined in the app module/file that uses this framework does not need to return 'ctx' everytime.
	'ctx' needs to be returned no matter what to trigger the next .then method
	
	This is great for normal sync and sequenced functions, but the problems lies with Promises.
	Especially with the move towards the use of Async/Await in the server module, it expects a
	Promise to be returned. Unlike the old way which will still work.
*/

const fnModifier = (fn) => (ctx) => { fn(ctx); return ctx; }; // Inlined shorthand function definition

const fnModifier = (fn) => (ctx) => fn(ctx) || ctx; // This modifier causes evaluation of undefined every single time.

/* Below 2 methods Only supports returning sequential functions and promise returning functions. Does not support async */
const fnModifier = (fn) => {
	if (fn instanceof Promise)
		return (ctx) => {
			return new Promise((resolve, reject) => {
				fn(ctx)
					.then((data) => {
						// If the handler defined did not resolve with ctx, then resolve with ctx.
						if (data)
							return resolve(data);
						return resolve(ctx);
					})
					.catch((error) => reject(error));
			})
		};
	else
		return (ctx) => {
			fn(ctx);
			return ctx;
		};

}

const fnModifier = (fn) => {
	if (!(fn instanceof Promise)) {
		return (ctx) => {
			fn(ctx);
			return ctx;
		};
	}
	return fn;
}