'use strict';

// Whereas redirect_map is a optional hashmap to check if redirect is needed

// If no redirect hashmap is given, assume that
// Every single method-route_handler will have its own redirect checker method!
// Note that I said checker method! It does not actually redirects, but checks if the incoming req needs to be redirected
// and redirect will be done with given url directly


module.exports = (response, url, redirect_map, type = 307) => {
	// I am assuming all redirects are to places without any prototypes, meaning all is hard links
	// Look at the output of the response.writeHead, see if you can chain a .end() to it

	if (redirect_map) { // If a redirect hashmap is provided
		url = redirect_map.get(url);
		if (!url) // If url does not need to be redirected
			return false;
	}

	// Look at the output of the response.writeHead, see if you can chain a .end() to it	
	response.writeHead(type, { Location: url });
	response.end();
	console.log(`Redirecting req to ${url}`);
	return true; // Stops browser from requesting more resources

	// Perhaps implement smth to check if redirect should be permanet using a 301
}

// communication needs to be stateless! STATELESS means cannot keep track of data of the other end

/* USE CASE:
1. Redirect to given url without any other checks or stuff. Just a plain 307 redirect
=>	redirect(response, '/login');

2. Check if request url exists in a redirect map and if exists, redirect to url in the hashmap
=>	redirect(response, request.url, static_redirect_map);

3. Permanent redirects
=>	redirect(response, '/', undefined, 301);
*/


module.exports = (response, url, redirect_type = 307) => {
	response.writeHead(redirect_type, { Location: url });
	response.end(); // Should I end the cycle here?
	console.log(`Redirecting req to ${url}`);
	// Implement a check for redirects that should be 301 permanet
}


/* USE CASE:
1. Redirect to given url without any other checks or stuff. Just a plain 307 redirect
=>	redirect(response, '/login');

2. Check if request url exists in a redirect map and if exists, redirect to url in the hashmap
=>	redirect(response, request.url, static_redirect_map);

3. Permanent redirects
=>	redirect(response, '/', undefined, 301);
*/