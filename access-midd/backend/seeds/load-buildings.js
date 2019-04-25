const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.join(__dirname, 'buildings.json'));
const buildingData = JSON.parse(contents);
const data = buildingData.map(obj => ({
  name: obj.name,
  code: obj.code,
  latitude: obj.coord[1],
  longitude: obj.coord[0],
  plan_url: '',
  created_at: Date.now(),
}));
// TODO: update mapping and add migration to add columns to table for
//       newer version of spreadsheet

exports.seed = knex => knex.batchInsert('buildings', data, 100);
