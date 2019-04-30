const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.join(__dirname, 'buildings.json'));
const data = JSON.parse(contents);

exports.seed = knex => knex.batchInsert('buildings', data, 50);
