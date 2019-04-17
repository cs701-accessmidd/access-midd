const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.join(__dirname, 'buildings.json'));
const building_data = JSON.parse(contents);
const data = buildingData.map(obj => ({
  name: obj.name,
  code: obj.code,
  latitude: obj.coord[1],
  longitude: obj.coord[0],
  plan_url: '',
}));

exports.seed = function (knex, Promise) {
  return knex.batchInsert('buildings', data, 100);
};
