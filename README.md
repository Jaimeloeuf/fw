# enkel
This is yet another Node JS framework for building RESTful APIs. But Why?  
This framework intends to be different by being lean, optimized but still simple to use.  
Chasing performance and reducing external dependencies.  
Most if not all of this framework is built entirely using Node.JS's native APIs.  
Main use cases for this framework is when you need to build a simple front facing RESTful service quickly, but don't want to deal with the extra bulk and packages that comes with other frameworks like Express JS.  
Lesser dependencies simply means less problems with dependency management and security vulnerabilities.  
Give this a spin to see what I meant!
## Note
This framework is currently in its alpha stage, the first major release, version 1.0.0, will be the beta release.  
This framework is free and open source, thus feel free to contribute! Create issues, or fork + pull requests if you find any bug you want to bring to my attention or fix it yourself!  
You can also drop me a email if you need assistance or would like to reach out to me.


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

/*	This fw allows you to define a route and a handler for that route.
	
	You can create/define routes based on their expected request methods with the built in methods like
	.get()  .post()  .put()  .del()

	Notice that you do not need to call the next middleware/function in the cycle, as the fw takes care
	of it in the server module of this framework. The methods exposed fw just adds that route that you
	defined into the server's router and add the annonymous function as the handler for that route in
	the same server.
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
- Upload a landing page onto enkel digital website first and setup basic mail forwarding so yumi can create the namecard first.

The example app should be something simple to show case a Vue JS app with fw used as a simple API terminator tied to a in memory data base. Or we can also choose to demo the SQL connector package.

- Clear out Ctx2 module and fix Ctx module.
- Write out the package.json file to prepare for deployment. When deployed code in the test and Example and archived folders code should not be bundled in together.
- Clean up the utils package / folder
- Look into the move where. utils package is moved into src. I worry the example app uses it and breaks.
- Build in support for data streaming.
    - Perhaps native gRPC implementation?
- Look at how jwts packaging is done.
- Work on creating the entry point of this framework.
- Integrate the pathToRegexp package.
- Make it so that the body parser and the cookie parsers are interchangeable, meaning that I can choose to not use it.
- Clean out all the out dated codes and work on making the docker file working
- Work on this README file.
    - Rewrite the above section on about the "ctx" object.
- After all the above is done, create a git tag and push it as a new version/release and publish on npmjs.org
- Work on creating the router module just like what Express has, the one where I do not need to import the app, and instead, we import the router object. the object can just be a plain and simple literal object for all the routes.
- Create a CI/CD pipe for this project too

Work on the community tab in my open source repos. To make it more like professional.
https://github.com/Jaimeloeuf/police-man/community

For DanceAway, create the front-end folder on root dir.
Decide what to use, vue or just plain front-end.

ABORTTT 
CANNOT SAVE package.json update due to the vulnerability thing.
Because if too long ago, the vulneralbility does not exist yet, so how you get it?


Look into names of famous minimalistic designers to name this package after
Or some famous character/thing named after simplicity
Or should the package be called Simple or Enkel?

Update the package.json to remove the  dependencies used by the exmaple app, and instead create a package.json file for the Example app.
And clean the dependencies of this framework.
Fix this README file by adding the double space to the end of all the sentences for new line.

fix jwts package. the test is breaking.


Get leslie from pirple to sponsor this project


## Back story
This project is made while following a class from the website [pirple.thinkific.com](pirple.thinkific.com)  
It is supposed to be a simple API server made in Node JS with no external dependencies, focused on using native libraries to implment most of the functionalities that a framework can give you, and by doing so, you get to learn the inner workings of many things and the software design patterns used by Node JS server app frameworks.  

I've have followed the class and work on the code more to make it a little bit different and hopefully better too? The main difference is that my code is more modularised and I used Promises quite extensively to sequence my Async code in the right manner.

Although the class did not use any external dependencies and all, I do currently have one external dependency for the generation and verification of Json Web Tokens. I did some token auth with the module as I learn more about it. I will perhaps one day phase it out and replace it with my own custom made Vanilla NodeJS solution, but for now, I will stick with it and perhaps even introduce more dependencies in the future. I will only be adding dependencies when I feel absolutely required/needed or just good to have in some places, such as JWT and perhaps to implement the BCrypt hash function.


## License
This framework is open source under the "BSD 3-Clause License".  
The author holds no liabilities for how this framework is used.