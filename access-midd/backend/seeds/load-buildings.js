const fs = require('fs');
// const path = require('path');
// TODO: specify path so directory you call from doesn't matter
// currently written to be run from the backend directory

const buildingData = JSON.parse(fs.readFileSync('seeds/buildings.json'));
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
