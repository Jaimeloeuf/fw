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
// Import DB to use.
const db = require('./db/db');
// Import the hashing algorithm
const password_hash = require('./hash');
const bcrypt = require('');

// Number of rounds used to generate the salt for the BCrypt hash function
const salt_rounds = 12;

app.get('/login', (ctx) => {
	/*	@Flow
		Read the username and password input from the user
		Verify if user exist in DB
			User exists
				Hash the password
				Check if the password is correct
					If password correct

						// Should I call the token microservice to generate the token instead?
							If I have a microservice that just generates tokens, what are its features and uses? Why do I need it?
							- It will be generating tokens
								- Encrypting and decrypting tokens as they will be JWE instead of JWTs
							- It will be generating refresh tokens
							- It will be called to generate new tokens with refresh tokens

						Generate a token and a refresh token for the user and return as part of the response

					else password invalid
						Respond with an auth failure
			User does not exist
				Respond with a auth failure.
		DB call failed
			Respond with a 500 server failure
	*/

	let user = db.get_user(username);
	let password = user.password;

	bcrypt.compare(password, hash)
		.then((res) => {
			// res === true

			// Then continue, else throw and return error by setting a reject status code
			// Call the token microservice
			createToken(ctx.auth);


			ctx.setStatusCode(403); // Respond with an auth failure
		});

	res = await bcrypt.compare("B4c0/\/", hash);
	if (!res)
		return false;

	// DB call failed
	ctx.setStatusCode(500); // Respond with a internal server failure.
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

	// Hash the password and store it back into the same variable.
	bcrypt.hash(password, salt_rounds, (err, hash) => {
		if (err)
			return console.log(err);
		hash;
		db.enter(hash);
	});


	// Create the data format for database insertion


	// Insert data into DB
	SQL_command = `INSERT INTO user(userID, userName, password, userType) VALUES ('appl01', 'main', 'A');`
	result = db.query(SQL_command);

	// If DB insertion successful, redirect user to the login page
	ctx.res_headers.location = '/home'; // ?? correct location?


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

// SQL command to update the password in the DB with a new one when the user forgets it.
SQL_command = `UPDATE customer SET branch="main" WHERE custage > 2;`


/*
	Think about how all these microservice will talk to each other?
		By HTTP requests? gRPC? PubSub?
			- See how can users of this framework implement gRPC communication with another instance of this framework
			  that belongs to a seperate 'micro service'
			- See how I can implement the Pub Sub model here, by allowing users to use both Redis and Kafka as pub sub
			- For my situation Kafka is better as it allows 'time-decoupled' event messaging.
		What about security for these communication protocols? What to do to prevent
		packet sniffers? Using smth to encrypt the connection like SSL/TLS?

	Is this microservicy thing fault tolerant?
		Meaning that if the service goes down what happerns?
		Does it mean that it is tolerant of one instant of a single service
		going down? Meaning that a cluster of emailing service will still be
		fine if one node goes down.

	To build out my own emailing microservice.
		- The email microservice will be in charge of storing the mailing list
		How to create an email with your own custom domain name?
		How to send a email with that custom domain based email?
		Add a feature/function where I can schedule when emails will be sent out.
*/