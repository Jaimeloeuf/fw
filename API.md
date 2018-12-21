# API routes:
Where variables in <> angled brackets. E.g.
<int: userID>
meaning the variable will be a user ID with a type of 'integer'

```url
/login // Shows the login page.
```



```url
/logout // Logout for current user. Will invalidate the current User's JWT
/logout/<hex: userID> // Invalidate the user with 'userID''s JWT
```




# Users API	(Users as in people who want to book services)
Users should be able to
1.	Have a home page that tells them all about their bookings and services that they book to. Like all
	the general informations.

2.	Users should be able to book new sessions for a specific service.

3.	Users should be able to update or delete a session for a specific service

Each bookingID is uniquely tied to a particular booking 'object' in the DB,
In the object, the data contained will be,
- UserID
- serviceID
- sessionID
- session details object
	- time
	- location
	- addtional information array.
- Status: which can be
	- Pending
	- Completed
	- Cancelled
- 

From the service ID, you can see who owns/created the service.
The current avail sessions of that service.



```url
/user/<hex: userID>
/user/<hex: userID>/create	// only for admin accounts
/user/<hex: userID>/book

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


# Service Provider APIs	(People who owns and creates services)
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