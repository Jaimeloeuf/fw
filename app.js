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


app.post('/user/register', (ctx) => {
	/*	Required data to create a new user:
		1. Email account as username
		2. Password
		3. Name
		4. Account type

		Optional data for user creation:
		1. Phone number to used for recovering account

		Constraints of new user creation:
		1. Email needs to be unique
		2. password must meet the password requirements that will be checked on the client side
	*/
	/*	Steps:
		1.	? Check if the username is a vaild one by checking for uniqueness
				- 
			:
				- Notify user that username/email is already used, and ask them if they want to login instead
				  or if they forgotten their password
	*/

	let { username, password, name, acc_type } = ctx.req_body; // Extract properties out from request body

	if (db.get(username)) // Username/Email not unique
		return render_template('error', username = username); // render_template like in flask using jinja2 and stop execution
	
	// Hash the password


	// Create the data format for database insertion


	// Insert data into DB


	// If DB insertion successful, redirect user to the login page



	// Send a email to the user

	// Add the user's email address to the mailing list table in the DB, by sending the email to the mailing's microservice
});

app.post('/user/forgot', (ctx) => {
	/*	Required data to apply for a forgot password token:
		1. Email account that is used as a username
		2. Phone number
	*/

	/*	Steps:
		1. ? Call DB to query if the email username exists
				- Generate a recovery token
				- Send user the link to get the token to their email
				- Wait for user to click on link sent in email
				- redirect user to reset password page when user clicks on link
				- If successfully resetted, redirect user back to the login page
			:
				- Ignore request if no such user exists


	*/
	ctx.req_body.username
	if (db.result === null)
		return; // Stop execution if user does not exist

	// Generate a recovery token


	// Send user a email with the link


});