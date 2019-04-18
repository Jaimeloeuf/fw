# File description
This file contains information on how the data should be structured in the database and how
it relates to one another. In essence, somesort of a entity relationship map or ORM.

## Bookings table/object
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