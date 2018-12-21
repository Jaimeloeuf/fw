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



## Users API	(Users as in people who want to book services)
```url
/user/<hex: userID>
/user/<hex: userID>/create	// only for admin accounts
/user/<hex: userID>/book {
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

/user/<hex: userID>/bookings	// Shows all current bookings
/user/<hex: userID>/bookings/all	// Shows all bookings from the start
/user/<hex: userID>/bookings/<bookingID>	// Display more detail for a particular booking
/user/<hex: userID>/bookings/<bookingID>/cancel
/user/<hex: userID>/bookings/<bookingID>/update
/user/<hex: userID>/bookings/<bookingID>

/user/<hex: userID>/services // Services that the current user is subscribed to
/user/<hex: userID>/services/<serviceID>	// Get details of the service with this service ID
/user/<hex: userID>/services/<serviceID>/delete  // Remove yourself from this service

/user/<hex: userID>/schedule	// General overview of your schedule. Should we use the goog calender API?
/user/<hex: userID>/schedule/<serviceID // The schedule or booked sessions, for service with <serviceID>
```


## Service Provider APIs	(People who owns and creates services)
```url
/user/<hex: userID>
/user/<hex: userID>/create	// only for admin accounts

/user/<hex: userID>/bookings	// Shows all current bookings
/user/<hex: userID>/bookings/all	// Shows all bookings from the start
/user/<hex: userID>/bookings/<bookingID>	// Display more detail for a particular booking
/user/<hex: userID>/bookings/<bookingID>/cancel
/user/<hex: userID>/bookings/<bookingID>/update
/user/<hex: userID>/bookings/<bookingID>

/user/<hex: userID>/services

/user/<hex: userID>/services/create	// Get the tools to create a service.
/user/<hex: userID>/services/create/save	// Save the service
/user/<hex: userID>/services/create/publish	// publish the service

/user/<hex: userID>/services/<serviceID>	// Get details
/user/<hex: userID>/services/<serviceID>/delete
/user/<hex: userID>/services/<serviceID>/update

/user/<hex: userID>/schedule	// General overview of your schedule. Should we use the goog calender API?
/user/<hex: userID>/schedule/<serviceID // The schedule or booked sessions, for this particular service
```




```js
```





```js
```