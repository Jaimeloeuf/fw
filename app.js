'use strict'; // Enforce use of strict verion of JavaScript

/*
	Example on how the framework will be used.
	The usage is quite similiar to the way express will be used.

	The framework will be exposing a single API via the 'fw' framework module,
	to allow the user/developer to define their own routes and define callback handlers.

	Perhaps for the handlers library. Add a prototype to the object so that all the handler
	functions have a prototype method called 'Protected'. So you can call
	CallBack.Protected(true)
	to set whether the route should be protected or not, in which if true there will be
	a automatic token verification process, where you will get back the token as part
	of the callback's arguements.
*/

// Dependencies
const app = require('./fw');


// app.route('')
app.get('/login', (ctx) => {
	if (ctx.auth === 'passwd')
		createToken(ctx.auth);
});