# Server info

To start the server: `node index.js`

Express tutorial used to set up server: https://expressjs.com/en/starter/hello-world.html

## API

- GET /buildings
    return list of all buildings from the buildings table
- PUT /buildings/new
    add a new building to the buildings table. Must send an object with at least name, code, latitude, and longitude.
- POST /buildings/:id
    update fields of the specified building (specify with id) that are given in the request

# Database

To create a new migration: `npx knex migrat:make migration_name`
To migrate database: `npx knex migrate:latest --env development`
To seed database: `npx knex seed:run --env development`

Sources for knex stuff:
- http://www.cs.middlebury.edu/~mlinderman/courses/cs312/s18/lectures/practical-rdbms.html
- https://knexjs.org/
