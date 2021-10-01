# 🪂 env-literal

This package iterates the variables of the process.env object, and parses them as if it were a literal javascript string, and injects them back into the same object

For example:

```shell
BASE_URL=http://localhost:3000
API=${BASE_URL}/api
```

In this case, the API variable will have the value http://localhost:3000/api

Unlike dotenv or dotenv-expand, variables are read directly from the system environment and not from an .env file

## Usage: as soon as possible, run the function:

```javascript
const envLiteral = require("env-literal");

if (process.env.NODE_ENV === "production") {
  envLiteral(); // call envLiteral(true) for debugging
}
```
