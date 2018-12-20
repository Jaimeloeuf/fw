# Project / Repo description
This project is made while following a class from the website [pirple.thinkific.com](pirple.thinkific.com)
It is supposed to be a simple API server made in Node JS with no external dependencies.
Focused on using native libraries to implment most of the functionalities that a framework will give you,
and by doing so, you get to learn the inner workings of many things and the software design patterns.

I've have followed the class and work on the code more to make it a little bit different and hopefully
better too? The main difference is that my code is more modularised and I used Promises quite extensively
to sequence my Async code in the right manner.

Although the class did not use any external dependencies and all, I do currently have one external dependency
for the generation and verification of Json Web Tokens. I did some token auth with the module as I learn more
about it. I will perhaps one day phase it out and replace it with my own custom made Vanilla NodeJS solution,
but for now, I will stick with it and perhaps even introduce more dependencies in the future.
I will only be adding dependencies when I feel absolutely required/needed or just good to have in some places,
such as JWT and perhaps to implement the BCrypt hash function.

# To anyone who wants to use this for whatever reasons.
I do not garuntee that this thing will work or whatsoever, this is meant as a learning experience for myself,
so if you want to look at my code for reference or to learn I'm cool with that, but if you use it for
production and bring down ur servers, that I ain't got nothing on that. If for whatever reason you see a bug
or smth you wanna fix, do submit a pull request to me too! :)

##On Windows
Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```powershell
$env:NODE_ENV="production"
```

##Tests
Test folder structure:
- test.yml	=> Yaml file to store run commands for artillery testing tool
###To use
Run the artillery tool with the newly created yml file with below command:
```powershell
artillery run test.yml
```

##API and usage
```js

```

### Misc info
To Change memory limit/use of the node process, use the below code and change 1024 to desired memory size in MB
```bash
node --max-old-space-size=1024 .\index.js