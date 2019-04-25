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
  // maybe combine routes as insert on duplicate key update?
  knex('buildings')
    .select('*')
    .whereRaw('name = ?', [req.body.name])
    .then((result => {
      if (result.length > 1) {
        res.status(409).send({ error: 'Conflict: building already exists'});
        // conflict error code to indicate attempted duplicate entry
      } else {
        new_building = Object.assign(req.body, { created_at: Date.now() });
        knex('buildings').insert(new_building).then(result => {
          res.status(201).send(result); // code for successfully created item
        }).catch((err) => {
          res.status(500).send(err); // try to parse the actual error maybe
        });
      }
    }));
});

// TODO: route to add info to existing building
app.post('/building/:id', (req, res) => {
  update_obj = Object.assign(req.body, { updated_at: Date.now() });
  knex('buildings')
    .where('id', '=', id)
    .update(update_obj)
    .then(result => {
      res.status(200).send(result); // code for success
    }).catch(err => {
      res.status(500).send(err); // try to parse the actual error maybe
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
