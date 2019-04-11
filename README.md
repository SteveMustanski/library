# library

This is a fake book website to practice building applications with node and express.

The applicaton has a list of books that are on the users list. Clicking on "read more" uses the good reads API to get the book's description and picture.

The list of books are hard coded in the admin route. Going to localhost:4000/admin will load the books into a mongo database which is used for the list of books.

The applicaton is also 'secured' using passport which has been disabled. This will be reenabled in the future.

## Set up

To set up the app, in addition to cloning the repo, you will need to set up a .env file for the APIs to work. Running "npm install" will install the dependencies, but you will need to get your own keys for each of the APIs.

You can get a developer api key by signing up at [the GoodReads site](https://goodreads.com)

The .env file will look like:

```
# Goodreads API

GOODREADS_ID="your goodreads api id"

```

Dotenv will set up your environment. You will need to include

```
const dovEnv = require('dotenv').config();
```

to make this happen. This is set up already in the good reads service.

The keys.js file which is required in the goodreadsService.js file will make the id available to the code.

You will also need to have a local mongo db up and running.

## TODO

- active the passport authentication
