const express = require('express');

const app = express();
const port = 3000;

const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const knexConfig = require('./knexfile');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/buildings', (req, res) => {
  knex('buildings').select().then((rows) => {
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
