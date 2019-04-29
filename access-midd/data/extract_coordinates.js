const fs = require('fs');

function readCSV(filename) {
  const contents = fs.readFileSync(filename).toString().trim().split('\n');
  const values = contents.slice(1).map(str => str.split(',').slice(1));
  const data = values.map((row) => {
    return {
      address: row[0],
      name: row[1],
      code: row[2],
      latitude: Number(row[8]),
      longitude: Number(row[9]),
      acc_entry: row[3] || '',
      acc_restroom: row[4] || '',
      elevator: row[5] || '',
      comment: row[6] || '',
      plan_url: row[7] || '',
    };
  });
  return data;
}

const data_academic = readCSV('./buildings_academic_coord.csv');
const data_residential = readCSV('./buildings_residential_coord.csv');
const data = data_academic.concat(data_residential);
fs.writeFileSync('buildings.json', JSON.stringify(data));
