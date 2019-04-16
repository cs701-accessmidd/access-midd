const fs = require('fs');
// const path = require('path');
// TODO: specify path so directory you call from doesn't matter

const building_data = JSON.parse(fs.readFileSync('seeds/buildings.json'));
const data = building_data.map(obj => {
    return {
        name: obj.name,
        code: obj.code,
        latitude: obj.coord[1],
        longitude: obj.coord[0],
        plan_url: '',
    };
});

console.log(data[0])

exports.seed = function(knex, Promise) {
  return knex.batchInsert('buildings', data, 100);
};
