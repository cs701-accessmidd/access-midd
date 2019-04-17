const express = require('express');

const app = express();
const port = 3000;

const knex_import = require('knex');
const knexConfig = require('./knexfile');

const knex = knex_import(knexConfig[process.env.NODE_ENV || 'development']);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/buildings', (req, res) => {
  knex('buildings').select().then((rows) => {
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
