# enkel
This is yet another Node JS framework for building RESTful APIs. But Why?  
This framework intends to be different by being lean, optimized but still simple to use.  
Chasing performance and reducing external dependencies (Only 1 external dependency, `jsonwebtokens` is used for generating/verifying JWTs).  
Most if not all of this framework is built entirely using Node.JS's native APIs.  
Main use cases for this framework is when you need to build a simple front facing RESTful service quickly, but don't want to deal with the extra bulk and packages that comes with other frameworks like Express JS.  
Lesser dependencies simply means less problems with dependency management and security vulnerabilities.  
Give this a spin to see what I meant!


## Note
This framework is currently in its alpha stage, the first major release, version 1.0.0, will be the beta release.  
This framework is free and open source, thus feel free to contribute! Create issues, or fork + pull requests if you find any bug you want to bring to my attention or fix it yourself!  
You can also drop me a email if you need assistance or would like to reach out to me.  
This framework only supports the basic GET / POST / PUT / DELETE operations.


## Using this framework
### Using docker / packaged stuff
Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```powershell
#  Basically run the command to make a docker image
# then call the thing to run it.
# ALso show how to do docker volume mounting.
# 
# You can set the env to either production or dev. Look at config.js for more details.
$env:NODE_ENV="production"
```


### Running it natively
This can be ran on Win/Mac/Linux systems.  
Below shows how to run your code from the various shells

Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```powershell
# You can set the env to either production or dev. Look at config.js for more details.
$env:NODE_ENV="production"
```


#### On Windows (Powershell)
Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```powershell
# You can set the env to either production or dev. Look at config.js for more details.
$env:NODE_ENV="production"
```

#### On Windows (CMD)
Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```cmd
# You can set the env to either production or dev. Look at config.js for more details.
$env:NODE_ENV="production"
```


## Using this framework.
For how to use this framework in detail, look at the example app provided in the "Example" directory.  
To run the example app:
```bash
> cd Example
# Perhaps can run the docker container instead?
> npm run ?
```
However if you need a quick start guide. Here is the most basic app built with fw:
```js
// Get a reference to the framework via the fw module.
const app = require('./fw');

/**
 * This fw allows you to define a route and a handler for that route.
 *
 * 	You can create/define routes based on their expected request methods with the built in methods like
 * 	.get()  .post()  .put()  .del()
 *
 * 	Notice that you do not need to call the next middleware/function in the cycle, as the fw takes care
 * 	of it in the server module of this framework. The methods exposed fw just adds that route that you
 * 	defined into the server's router and add the annonymous function as the handler for that route in
 * 	the same server.
 */ 

// Example ping route that sends back a 200 ok as long as server is up.
app.get('/ping', (ctx) => {
	ctx.setStatusCode(200); // Technically unnecessary as status code defaults to 200 if none set.
});

// Listen on port 3000 and attach a callback function to deal with it
app.listen(3000, (status) => {
    if(status)
        console.log("Success")
    else {
        console.log("Failure");
        process.exit(1);
    }
})

// Listen on port 3000 and attach a callback function to deal with it
app.listen(3000)
    .then(() => console.log("Success"))
    .catch(() => {
        // Log failure and exit with a failure code
        console.log("Failure");
        process.exit(1);
    })
```


### About the 'ctx' object created from the Ctx class
The status code property 'statusCode' is a write once and read only property. Meaning that you can only set this value once throughout the request/response cycle. If you try to set it more than once, a error will be thrown and your client will receive a 500 status code.
The status code to be returned to the client is 200 by default. The framework will not change this value by itself unless there is an error in the error array of the 'ctx' object and the status code is set below the error code ranges above 400, the framework will then return a 500 to client to indicate internal error.
So if your client is getting back a 500 code even though you did not set it to 500, check for errors by looking into the error array of the 'ctx' object by turning on dev mode to allow debug function to run.


## Running Tests
All the tests are stored inside the "test" directory in the project root directory.  
Run the tests with:
```bash
npm test
```


## Other miscellaneous informations
To Change memory limit/use of the node process, use the below code and change 1024 to desired memory size in MB
```bash
node --max-old-space-size=1024 .\index.js
```


## Resources available from the Framework / Things that are user modifiable
The user of this framework will have access to the:
1.	methods exposed by the fw module and all the methods provided in the 'ctx' object that will be passed in to the route handlers.
2.	The db schema file to define your own db / settings / schema and more
3.	user Config file that will be read in by the config module.
	In this file you can choose to disable default route handlers like ping.


## Todos
- Clear out Ctx2 module and fix Ctx module
- Clean up the utils package / folder
- Build in support for data streaming
- Add native gRPC implementation?
- Integrate `pathToRegexp` package
- Make body parser and cookie parsers optional
- Remove out dated code
- Fix the docker file
- Rewrite the above section about the "ctx" object.
- Work on creating the router module just like what Express has, the one where I do not need to import the app and instead, just the router object.
- Allow multiple route handlers for the same route a.k.a middlewares


## License
This framework is open source under the "BSD 3-Clause License".  
The author holds no liabilities for how this framework is used.