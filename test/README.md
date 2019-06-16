# Framework tests
This is the directory for all the tests / unit-tests to be ran against the framework itself.  
All other tests will also be in this directory.

## Directory structure:
- test.yml
    - Yaml file to store run commands for artillery testing tool
    - artillery is not specified as a dev dependency yet.
     ACRUALLY THIS only applies to the example app. Which is not here Move this into Example/

### To use
Run the artillery tool with the newly created yml file with below command:
```powershell
artillery run test.yml
```