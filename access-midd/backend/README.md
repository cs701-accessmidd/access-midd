# Server info

To start the server: `node index.js` or `node .` from backend directory

Express tutorial used to set up server: https://expressjs.com/en/starter/hello-world.html

## API

- GET /buildings
    return list of all buildings from the buildings table
- PUT /buildings/new
    add a new building to the buildings table. Must send an object with at least name, code, latitude, and longitude.
- POST /buildings/:id
    update fields of the specified building (specify with id) that are given in the request

# Database

## Schema

Table: buildings
Columns:
- address: string
- name: string
- code: string
- latitude: float
- longitude: float
- acc_entry: boolean
- acc_restroom: boolean
- elevator: boolean
- comment: text
- plan_url: string
- created_at: timestamp
- updated_at: timestamp

## Commands

To create a new migration: `npx knex migrate:make migration_name`
To migrate database: `npx knex migrate:latest`
To seed database: `npx knex seed:run`

Sources for knex and database setup:
- http://www.cs.middlebury.edu/~mlinderman/courses/cs312/s18/lectures/practical-rdbms.html
- https://knexjs.org/
