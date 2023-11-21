const fs = require("fs");
const temp = fs.readFileSync("./temp.csv");
const { parse } = require("csv-parse/sync");

const data = {};

const records = parse(temp, {
    columns: true,
    skip_empty_lines: true
});

for (const record of records) {
    for (let recordKey in record) {
        if (recordKey === 'key') {
            continue;
        }
        if (!data[recordKey]) {
            data[recordKey] = {};
        }
        data[recordKey][record['key']] = record[recordKey];
    }
}
const fff = 0;

fs.writeFileSync("./output111.json", JSON.stringify(data));

