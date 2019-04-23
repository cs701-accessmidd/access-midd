const express = require('express');

const app = express();
const port = 3000;

const knexImport = require('knex');
const knexConfig = require('./knexfile');

const knex = knexImport(knexConfig[process.env.NODE_ENV || 'development']);

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/buildings', (req, res) => {
  // TODO: add filtering via a query parameter
  knex('buildings').select().then((rows) => {
    res.json(rows);
  });
});

app.put('/buildings/new', (req, res) => {
  // there's definitely a better way to do this than make two queries
  knex('buildings').select('*').whereRaw('name = ?', [req.body.name]).then((result => {
    if (result.length > 1) {
      res.status(409).send({ error: 'Conflict: building already exists'});
      // conflict error code to indicate attempted duplicate entry
    } else {
      knex('buildings').insert(req.body).then((result) => {
        res.status(201).send(result); // code for successfully created item
      }).catch((err) => {
        res.status(500).send(err); // try to parse the actual error maybe
      });
    }
  }));
});

// TODO: route to add info to existing building
app.post('/building/:id', (req, res) => {

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
