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
	user: 'myUser',
	password: 'myPassword',
	connectionLimit: 5
});


async function asyncFunction() {
	let conn;
	try {
		// Call the pool function to get a connection thread
		conn = await pool.getConnection();

		// Execute a query and wait for the results before saving it into the variable upon receiving it.
		const rows = await conn.query("SELECT 1 as val");
		// Display the results from the last query
		console.log(rows); //[ {val: 1}, meta: ... ]

		// Create another query/insertion and wait for the output
		const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "db"]);
		// Display the response of the DB after the insertion request.
		console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
	}
	catch (err) {
		// Catch the error and let it bubble up.
		throw err;
	}
	finally {
		// If the connection was successfully created and stored in the variable, close the connection to free it back to the pool.
		if (conn)
			return conn.end();
	}
}


module.exports.get = () => {

}

class DB {
	constructor() {
		this.conn = this.connect();

	}
	connect() {
		// Call the pool function to get a connection thread
		return await pool.getConnection();
	}

	execute(command) {
		return await conn.query(command);
	}
}
