'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc Module description:
	This module will handle all search related API calls and contains all the search-related code.

	@TODO
	- Search how to use Node JS Child processes / Clusters to do database querying on another 'thread'
	^ Or should I do the so called async task on another 'service'
	^ So make this handler into a standalone API server that provides 1 servce
*/

// Search API handler
handler.search = (ctx) => {
	/*
		Assumes that the incoming request in formulated nicely
		OR,
		pass the incoming request through a pure funcion, where it is smth like ctx module that will extract all
		info about the search request out in a nice format for processing.

		How do I make parsing JSON or reading data from an object into an async operation?
	*/
	db.search.query(ctx.query, ctx.body);

}