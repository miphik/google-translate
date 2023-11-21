const trans = require('./existing-tanslations.json');
const fs = require("fs");
const { parse } = require("csv-parse/sync");

const searchingLang = 'de';
const fff = fs.readFileSync("./out.csv");

const records = parse(fff, {
    columns: true,
    skip_empty_lines: true
});

for (let transKey in trans) {
    if (trans[transKey]['language'] !== searchingLang) {
        continue;
    }
    // trans[transKey]['data']

    for (let key in records) {
        trans[transKey]['data'][records[key].key] = records[key][searchingLang];
        //if (records[key][searchingLang].startsWith("\"")) {
        //    const fff = 0;
        //}
    }
}

fs.writeFileSync("./output.json", JSON.stringify(trans));
