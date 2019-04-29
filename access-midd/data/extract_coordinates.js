const fs = require('fs');

function readCSV(filename) {
  const contents = fs.readFileSync(filename).toString().trim().split('\n');
  const values = contents.slice(1).map(str => str.split(',').slice(1));
  const data = values.map((row) => {
    const inputName = row[6];
    return {
      name:
      code:
      latitude:
      longitude:
      plan_url:
      acc_entry:
      acc_restroom:
      elevator:
      comment:
    };
  });
  return data;
}

const data_academic = readCSV('./buildings_academic_coord.csv');
const data_residential = readCSV('./buildings_residential_coord.csv');
const data = data_academic.concat(data_residential);
fs.writeFileSync('buildings.json', JSON.stringify(data));
