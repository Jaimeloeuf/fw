'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module takes care of reading the database user name and password from the envrionmental variables
	and export them to allow the db module to use these to create the connection to the DB
*/

module.exports = {
	// Read acceptable environmental variables injected, Overwrite existing defaults if any.
	host: process.env.host || 'mydb.com',
	ssl: true, // To enable or disable use of TLS to encrypt communication traffic
	user: process.env.user || 'myUser',
	password: process.env.password || 'myPassword',
	connectionLimit: process.env.conns || 5
};