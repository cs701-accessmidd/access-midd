const express = require('express');
const knexImport = require('knex');
const knexConfig = require('./knexfile');

const knex = knexImport(knexConfig[process.env.NODE_ENV || 'development']);
const app = express();
const port = 3000;

app.use(express.json());

app.get('/buildings', (req, res) => {
  knex('buildings').select().then((rows) => {
    res.json(rows.map(obj => Object.assign(obj, { coord: [obj.longitude, obj.latitude] })));
  });
});

app.put('/buildings/new', (req, res) => {
  // there's definitely a better way to do this than make two queries
  //   does sqlite support insert on duplicate key update?
  knex('buildings')
    .select('*')
    .whereRaw('name = ?', [req.body.name])
    .then((result) => {
      if (result.length > 1) {
        res.sendStatus(409); // conflict error code to indicate attempted duplicate entry
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
          res.sendStatus(500);
        });
      }
    });
});

app.post('/buildings/:id', (req, res) => {
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
      res.sendStatus(500);
    });
});

app.delete('/buildings/:id', (req, res) => {
  knex('buildings')
    .where('id', '=', req.params.id)
    .del()
    .then(() => {
      res.sendStatus(200); // code for success
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`); // eslint-disable-line no-console
});
