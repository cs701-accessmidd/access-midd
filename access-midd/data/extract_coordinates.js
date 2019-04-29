const fs = require('fs');

function readCSV(filename) {
  const contents = fs.readFileSync(filename).toString().trim().split('\n');
  const values = contents.slice(1).map(str => str.split(',').slice(1));
  const data = values.map(row => ({
    address: row[0],
    name: row[1],
    code: row[2],
    latitude: Number(row[8]),
    longitude: Number(row[9]),
    acc_entry: row[3] === 'yes',
    acc_restroom: row[4] === 'yes',
    elevator: row[5] === 'yes',
    comment: row[6] || '',
    plan_url: row[7] || '',
  }));
  return data;
}

const dataAcademic = readCSV('./buildings_academic_coord.csv');
const dataResidential = readCSV('./buildings_residential_coord.csv');
const data = dataAcademic.concat(dataResidential);
fs.writeFileSync('buildings.json', JSON.stringify(data));
