var totest = 'F34';
isHex(totest);
function isHex(hex) {
	let b10 = parseInt(hex, 16); // Convert to base 10
	// See if the base 10 value converted back to base 16 matches the input.
	return (b10.toString(16) === hex.toLowerCase()) ? b10 : false;
}