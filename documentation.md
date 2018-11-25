
#Things to note
No errors should be thown by the app, to prevent the app from dying.
If there is any stray error thrown, catch all of it with,
```js
process.on('warning', e => console.warn(e.stack));
process.on('uncaughtException', e => console.warn(e.stack));
```
Try to implement ErrBack error handling methodology, where the first arguement of any function
is an error object. Which will get passed all the way if neccessary to the finalHandler

#On Windows
Since Windows uses PowerShell as the default shell, use the below command to set environmental variables
$env:NODE_ENV="production"



<!-- To modify the example API documentation below -->
#API
```js
var contentType = require('content-type')
```

### contentType.parse(string)
```js
var obj = contentType.parse('image/svg+xml; charset=utf-8')
```

Parse a content type string. This will return an object with the following
properties (examples are shown for the string `'image/svg+xml; charset=utf-8'`):

 - `type`: The media type (the type and subtype, always lower case).
   Example: `'image/svg+xml'`

 - `parameters`: An object of the parameters in the media type (name of parameter
   always lower case). Example: `{charset: 'utf-8'}`

Throws a `TypeError` if the string is missing or invalid.