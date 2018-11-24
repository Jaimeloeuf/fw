/* Write function only avail in this module/package. Thus encapsulated.
Created to be a more efficient alternative to log(), as it uses many assumptions
Assume write is only called with 'strings' as arguement type. */
// Version 1 of write, assumes that it must be a string an no error is made during usage
const write = (str) => process.stdout.write(str);
// Version 2 of write
// const write = (str) => {
// 	if (typeof (str) !== 'string')
// 		throw err;
// 	process.stdout.write(str);
// }
// Version 3 of write, currently Deperecated 'write' function below
// const write = (str, newline = false) => (typeof (str) !== 'string')
// 	? console.log(str)
// 	: process.stdout.write((newline) ? `${str}\n` : str);

function log() {
	let len = arguments.length;

	// If boolean value is found at the end, use it as condition for newline
	if (typeof (arguments[len - 1]) === 'boolean')
		--len; // Exclude value from being printed out, by reducing the len variable

	for (let i = 0; i < len; i++) {
		let data = arguments[i];
		// Use console.log() for printing out objects, or non strings
		(typeof (data) !== 'string')
			? console.log(data) // As console.log function can handle non-string data types automatically
			: write(data);
	}

	// If the last arguement is a boolean and is 'false', or if last printed arguement is not a string.
	if (((typeof (arguments[len]) === 'boolean') && (!arguments[len])) || (typeof (arguments[len - 1]) !== 'string'))
		return; // End the function without any trailing new lines characters
	console.log(); // Print a trailing new line
}

const debug = {
	console_lines: (n) => {
		for (let i = 0; i < n; i++)
			write('-');
	}
};

module.exports = {
	log: log,
	debug: debug
};