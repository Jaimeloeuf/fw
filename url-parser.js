'use strict';

/* Use cases:
console.log(url_parser3(routes, '/user/3/appt/4'));
routes.set('user/:userID/:niggas-name/:1/:2/:3', {}); // Live adding of a new route
routes_prototype_filler(routes); // Second call to allow hot reload of routes
console.log(url_parser3(routes, 'user/gsus//no/yes/yes')); // From the new hot reload route
*/

module.exports = url_parser3();

/* Notes about parser 1:
	Simplest design that requires self created count as no count is created by the
	loop constructs.
*/
function url_parser1(routes_map, url) { // Currently a url parser for private routes
	let url_array = tokenize(url);
	let url_token_count = url_array.length;
	let variables, index; // 'variables' hold variable data extracted from url with prototype format

	// Loop thru hashmap to find key with the same token count to do checking
	for (let [key, value] of routes_map) // Loop thru entire private_routes_prototype HashMap
	{
		if (url_token_count === value.token_count) // Check if number of token same
		{
			index = 0; variables = {}; // Reset
			for (let element of value.token_array) {
				if (element.charAt(0) === ':') // If the token in Map starts with a ':' to indicate variable, then read and store the variable into the variables object
					variables[element.slice(1)] = url_array[index]; // Read variable in URL into object
				else if (element !== url_array[index])
					break; // Skip this prototype and go to the next one
				if (++index === url_token_count)
					return variables;
			}
		}
	}
	return undefined;
}

/* Notes about parser 2:
	Performance wise more memory intensive and not as fast because of the
	'value.token_array.entries()' call. It creates another of the array that is iterable
	in memory before returning that to iterate.
	This is the most convenient method but the most resource intensive one.
*/
function url_parser2(routes_map, url) {
	let url_array = tokenize(url);
	let url_token_count = url_array.length;
	let variables; // 'variables' hold variable data extracted from url with prototype format

	// Loop thru hashmap to find key with the same token count to do checking
	for (let [key, value] of routes_map) // Loop thru entire private_routes_prototype HashMap
	{
		if (url_token_count === value.token_count) // Check if number of token same
		{
			variables = {}; // Reset
			for (let [i, element] of value.token_array.entries()) {
				if (element.charAt(0) === ':') // If the token in Map starts with a ':' to indicate variable, then read and store the variable into the variables object
					variables[element.slice(1)] = url_array[i]; // Read variable in URL into object
				else if (element !== url_array[i])
					break; // Skip this prototype and go to the next one
				if ((i + 1) === url_token_count)
					return variables; // When all tokens looped through
			}
		}
	}
	return undefined;
}

/* Notes about parser 3:
	The fastest and least resource intensive one with all the avail optimizations
	using a plain JS reversing for loop that reduces value call and all.
	In the reverse for loop there is also a zero condition check to increase speed
*/
function url_parser3(routes_map, url) {
	let url_array = tokenize(url);
	let url_token_count = url_array.length;
	let variables, token; // 'variables' hold variable data extracted from url with prototype format

	for (let [key, value] of routes_map) // Loop thru entire private_routes_prototype HashMap
	{
		if (url_token_count === value.token_count) // Check if number of token same
		{
			variables = {};
			for (let i = value.token_count - 1; true; i--) // Check/test if this loop works
			{
				token = value.token_array[i];
				if (token.charAt(0) === ':') // If the token in Map starts with a ':' to indicate variable, then read and store the variable into the variables object
					variables[token.slice(1)] = url_array[i]; // Read variable in URL into object
				else if (token !== url_array[i])
					break; // Skip this prototype and go to the next one
				if (!i)
					return variables; // When all tokens looped through
			}
		}
	}
	return undefined;
}

function url_parser3(routes_map, url) {
	let url_array = tokenize(url);
	let url_token_count = url_array.length;
	let variables, token; // 'variables' hold variable data extracted from url with prototype format

	for (let [key, value] of routes_map) // Loop thru entire private_routes_prototype HashMap
		if (url_token_count === value.token_count) // Check if number of token same
		{
			variables = {};
			for (let i = value.token_count - 1; true; i--) // Check/test if this loop works
			{
				token = value.token_array[i];
				if (token.charAt(0) === ':') // If the token in Map starts with a ':' to indicate variable, then read and store the variable into the variables object
					variables[token.slice(1)] = url_array[i]; // Read variable in URL into object
				else if (token !== url_array[i])
					break; // Skip this prototype and go to the next one
				if (!i)
					return variables; // When all tokens looped through
				// In this case wouldn't it be better to use a reverse while loop.
			}
		}

	for (let [key, value] of routes_map) // Loop thru entire private_routes_prototype HashMap
		if (url_token_count === value.token_count) // Check if number of token same
		{
			variables = {}; // reset the variables object
			for (let i = value.token_count - 1; true; i--) // Basically a reverse while loop.
			{
				token = value.token_array[i];
				if (token.charAt(0) === ':') // If the token in Map starts with a ':' to indicate variable, then read and store the variable into the variables object
					variables[token.slice(1)] = url_array[i]; // Read variable in URL into object
				else if (token !== url_array[i])
					break; // Skip this prototype and go to the next one
				if (!i)
					return variables; // When all tokens looped through
			}
		}


	return undefined; // Unneccessary as the function will auto return a undefined when nothing is defined to be returned.
}

function tokenize(url) {
	return url.split('/');
}

app.use(function (req, res, next) {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});
// We will use app.all_use(...)  to bind our redirect middleware to express. To force all routes to their HTTPS version

// if(value & 1)
// 	// If true means that value is odd number

function body_parser(request, response, parse_options) {
	response.readHead() // See what previous middleware has set

	// parse the body as defined by the parse_options object

	let data = request.body;
	data.indexOf('');

	response.writeHead(); // Add more stuff if needed
	request.write(); // Add more stuff if needed to the request object
}

function parse(url) {

}