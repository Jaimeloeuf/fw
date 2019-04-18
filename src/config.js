'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Config.js is a Module used to create and export configuration variables, and allow users to use
	variables read from the envrionmental variables, and store settings into a configuration file,
	for long term / permanent storage of it.
*/

// Container for all environments
const environments = {};

// Creating the different environments and their default values
environments.dev = {
	'envName': 'dev',
	'port': 3000
};

environments.staging = {
	'envName': 'staging',
	'port': 8000
};

environments.production = {
	'envName': 'production',
	'port': 5000 // NGINX on port 80 will route API calls to here
};

// Determine which environment to export based on command-line argument received
let env_arg = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
let current_env = typeof (environments[env_arg]) === 'object' ? environments[env_arg] : environments['dev'];

// See if any additional acceptable environmental variables injected, Overwrite existing defaults if available.
current_env.port = process.env.HTTP_PORT || current_env.port;
current_env.user = process.env.user; // See how to do this, esp for linux systems

module.exports.env = current_env;

module.exports.jwt = {
	aud: undefined,
	iss: undefined,
	// More fields such as the Public key for decrypting JWE and stuff
};