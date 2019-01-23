'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	This module contains simplified high level functions for the user to directly get a few pre-defined details instead of
	writing up your own SQL Commands. Meaning that instead of 


*/

// Dependencies
const db = require('mariadb');

// Create a pool of available connections to the DB
const pool = db.createPool({
	// Create the pool with the login credentials. Should update this to use credentials injected from the environment
	host: 'mydb.com',
	ssl: true, // To enable or disable use of TLS to encrypt communication traffic
	user: 'myUser',
	password: 'myPassword',
	connectionLimit: 5
});

/* Function that gets a connection thread from the pool and execute the given SQL command */
async function query(sql_query) {
	let conn, result;
	try {
		// Call the pool function to get a connection thread
		conn = await pool.getConnection();
		// Execute a query and wait for the results before saving it into the variable upon receiving it.
		result = await conn.query(sql_query);
	}
	catch (err) {
		// Catch the error and let it bubble up.
		throw err;
	}
	finally {
		// If the connection was successfully created and stored in the variable, close the connection to free it back to the pool.
		if (conn)
			conn.end();

		// Return result if the DB successfully returned something
		if (result)
			return result;
	}
}

// Create and hold a single connection object/thread if you are going to constantly use it.
class DB {
	constructor() {
		// Method to call the pool function to get a connection thread
		this.connect = async () => await pool.getConnection();
		// Method to execute query with the connection thread stored in this object.
		this.query = async (command) => await this.conn.query(command);
		// Method to delete off this object's connection thread
		this.delete = () => this.conn.end()

		// Get a connection thread and store it.
		this.conn = this.connect();
	}
}

module.exports.get_user = (userName) => {
	const result = query(`SELECT * FROM users WHERE username IS ${username}`)
		.catch((err) => console.error(err));
	return result;
	// Catch the error and let it bubble up.
}


/*	@Todo
	See if it is valid to declare and use async methods in the constructor of the DB class.

*/