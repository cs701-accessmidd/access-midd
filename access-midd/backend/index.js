const express = require('express');

const app = express();
const port = 3000;

const knexImport = require('knex');
const knexConfig = require('./knexfile');

const knex = knexImport(knexConfig[process.env.NODE_ENV || 'development']);

app.use(express.json());

app.get('/buildings', (req, res) => {
  knex('buildings').select().then((rows) => {
    res.json(rows.map(obj => Object.assign(obj, { coord: [obj.longitude, obj.latitude] })));
  });
});

app.put('/buildings/new', (req, res) => {
  // there's definitely a better way to do this than make two queries
  // maybe combine routes as insert on duplicate key update?
  knex('buildings')
    .select('*')
    .whereRaw('name = ?', [req.body.name])
    .then((result) => {
      if (result.length > 1) {
        res.status(409).send({ error: 'Conflict: building already exists' });
        // conflict error code to indicate attempted duplicate entry
      } else {
        const newBuilding = {
          address: req.body.address || '',
          name: req.body.name,
          code: req.body.code,
          latitude: req.body.coord[1],
          longitude: req.body.coord[0],
          acc_entry: req.body.acc_entry,
          acc_restroom: req.body.acc_restroom,
          elevator: req.body.elevator,
          comment: req.body.comment || '',
          plan_url: req.body.plan_url || '',
          created_at: Date.now(),
        };
        knex('buildings').insert(newBuilding).then(() => {
          res.sendStatus(201); // code for successfully created item
        }).catch((err) => {
          console.log(err); // eslint-disable-line no-console
          res.sendStatus(500); // try to parse the actual error maybe
        });
      }
    });
});

app.post('/building/:id', (req, res) => {
  const updateObj = {
    name: req.body.name,
    code: req.body.code,
    latitude: req.body.coord[1],
    longitude: req.body.coord[0],
    updated_at: Date.now(),
    comment: req.body.comment || '',
    plan_url: req.body.plan_url || '',
    acc_entry: req.body.acc_entry,
    acc_restroom: req.body.acc_restroom,
    elevator: req.body.elevator,
  };
  knex('buildings')
    .where('id', '=', req.params.id)
    .update(updateObj)
    .then(() => {
      res.sendStatus(200); // code for success
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
      res.sendStatus(500); // try to parse the actual error maybe
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
