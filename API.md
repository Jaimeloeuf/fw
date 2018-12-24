# File description
This file contain all the information needed for a front-end dev to develop the WebApp based
on the behaviour exposed via the APIs as stated below.

# API routes:
Where variables in <> angled brackets. E.g.
<int: userID>
meaning the variable will be a user ID with a type of 'integer'


## Login and Logout
```url
/login // Shows the login page.
```


```url
/logout // Logout for current user. Will invalidate the current User's JWT
/logout/<hex: userID> // Invalidate the user with 'userID''s JWT
```



## Full list of User APIs	(Users as in people who want to book services)
- /user/<hex: userID>
- /user/<hex: userID>/create	// only for admin accounts
- /user/<hex: userID>/book {
	serviceID:
	
	time:
	
	session:

	recurring: true
	recurrence: {
		daily: false,
		weekly: false,
		monthly: false,
		yearly: false,
		every: monday,
		time: 7pm
	}
}

- /user/<hex: userID>/bookings	// Shows all current bookings
- /user/<hex: userID>/bookings/all	// Shows all bookings from the start
- GET /user/<hex: userID>/bookings/<hex: bookingID>/	// Display more detail for a particular booking
- DEL /user/<hex: userID>/bookings/<hex: bookingID>/	// cancel or delete the booking
- PUT /user/<hex: userID>/bookings/<hex: bookingID>/	// Update the booking
- /user/<hex: userID>/bookings/<hex: bookingID>

- /user/<hex: userID>/services // Services that the current user is subscribed to
- /user/<hex: userID>/services/<hex: serviceID>	// Get details of the service with this service ID
- /user/<hex: userID>/services/<hex: serviceID>/delete  // Remove yourself from this service

- /user/<hex: userID>/schedule	// General overview of your schedule. Should we use the goog calender API?
- /user/<hex: userID>/schedule/<hex: serviceID> // The schedule or booked sessions, for service with <hex: serviceID>



### /user/<hex: userID>
Homepage of the user with the given userID.
Should I give the server a userID? Since I am sending over the JWT, wouldn't the JWT contain that information alr???
So that the user can bookmark the page?? But that would mean that the server need to check the userID from the url
against the one read from the JWT...


DMS === Database management software

### /user/<hex: userID>/bookings
GET:
Shows all current bookings of the user.
What happens is that when the server receives this request, it looks into the database with that user ID after JWT verification and get a list of all the current bookings the user have.
Should I ask the DMS to look through the tables and find the bookings that are still time valid and return the data, or should I ask the DMS to return me all the bookings of the user and filter out the current time valid ones in the node app?

POST:











## Service Provider APIs	(People who owns and creates services)
- /user/<hex: userID>
- /user/<hex: userID>/create	// only for admin accounts
- 
- /user/<hex: userID>/bookings	// Shows all current bookings
- /user/<hex: userID>/bookings/all	// Shows all bookings from the start
- /user/<hex: userID>/bookings/<hex: bookingID>	// Display more detail for a particular booking
- /user/<hex: userID>/bookings/<hex: bookingID>/cancel
- /user/<hex: userID>/bookings/<hex: bookingID>/update
- /user/<hex: userID>/bookings/<hex: bookingID>

- /user/<hex: userID>/services

- /user/<hex: userID>/services/create	// Get the tools to create a service.
- /user/<hex: userID>/services/create/save	// Save the service
- /user/<hex: userID>/services/create/publish	// publish the service

- /user/<hex: userID>/services/<hex: serviceID>	// Get details
- /user/<hex: userID>/services/<hex: serviceID>/delete
- /user/<hex: userID>/services/<hex: serviceID>/update

- /user/<hex: userID>/schedule	// General overview of your schedule. Should we use the goog calender API?
- /user/<hex: userID>/schedule/<hex: serviceID // The schedule or booked sessions, for this particular service




```js
```





```js
```