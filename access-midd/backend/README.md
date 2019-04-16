# Server info

To start the server: `node index.js`
Then go to localhost:3000/buildings to see unformatted list of buildings

Source for skeleton server.js: https://expressjs.com/en/starter/hello-world.html (Express.js tutorial)

# Database

To migrate database: `npx knex migrate:latest --env development`
To seed database: `npx knex seed:run --env development`

Sources for knex stuff:
- http://www.cs.middlebury.edu/~mlinderman/courses/cs312/s18/lectures/practical-rdbms.html
- https://knexjs.org/
