const fs = require('fs');

function readCSV(filename) {
    const contents = fs.readFileSync(filename).toString().trim().split("\n");
    const columns = contents[0].split(",").slice(1);
    const values = contents.slice(1).map(str => str.split(",").slice(1));
    const data = values.map(row => {
        const inputName = row[6];
        return {
            name: inputName.slice(0, inputName.lastIndexOf(" ")-11),
            code: inputName.split(' ')[0],
            coord: [Number(row[8]), Number(row[7])],
        };
    });
    return data;
}

const data = readCSV("./buildings_coordinates.csv");
fs.writeFileSync("buildings.json", JSON.stringify(data));
