'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Module to allow use of the twilio API to send users SMS
*/

module.exports = (phone, msg) => {

	return new Promise((resolve, reject) => {
		// Validate parameters
		phone = typeof (phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
		msg = typeof (msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;

		// If phone or message is invalid or undefined, reject with error.
		if (!(phone && msg))
			reject('Given parameters were missing or invalid for sms module');

		// Configure the request payload
		let stringPayload = querystring.stringify({
			'From': config.twilio.fromPhone,
			'To': '+65' + phone,
			'Body': msg
		});

		// Configure the request details
		let requestDetails = {
			'protocol': 'https:',
			'hostname': 'api.twilio.com',
			'method': 'POST',
			'path': '/2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json', // To change
			'auth': config.twilio.accountSid + ':' + config.twilio.authToken,
			'headers': {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(stringPayload)
			}
		};

		// Instantiate the request object
		let req = https.request(requestDetails, (res) => {
			// Grab the status of the sent request
			let status = res.statusCode;
			
			// Callback successfully if the request went through
			if (status == 200 || status == 201)
				resolve();
			else
				reject('Status code returned was ' + status);
		});

		// Bind to the error event so it doesn't get thrown
		req.on('error', (err) => reject(err));

		// Add the payload
		req.write(stringPayload);

		// End the request
		req.end();
	});
};