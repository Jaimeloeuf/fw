#On Windows
Since Windows uses PowerShell as the default shell, use the below command
to set environmental variables.
```powershell
$env:NODE_ENV="production"
```

To Change memory limit/use of the node process, use the below code and change 1024 to desired memory size in MB
```bash
node --max-old-space-size=1024 .\index.js
```

#Tests
Test folder structure:
- test.yml	=> Yaml file to store run commands for artillery testing tool
##To use
Run the artillery tool with the newly created yml file with below command:
```powershell
artillery run test.yml
```



```
#API
```js

```

## contentType.parse(string)
```js

```


#API Server routes
/sample
/ping