# Tables in the DB  (Total 2 tables)

## Users table Attributes:
- userID
	- The userID will be used as the Primary Key of the table
	- Number up to 6 Digits.
	- Auto-increment
	- cannot reuse the number
- userName / user-email
	- The email used to sign up for the system
- password
	- The hash of the user's password created with the salt in the same row
- salt
	- 6 Byte random character salt.


## Users' phone number table Attributes:
- userID
	- Primary key / foriegn key of this table
- User's phone number
	- 8 Digit for singapore? Or should this store the '+' sign too? Like the area code and stuff


After deleting your account, if you are to re-create an account with the same username/email, then
your old account will be activated, with the password, "resetted".
