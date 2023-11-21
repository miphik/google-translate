const trans = require('./trans.json');

const temp = [];
const headers = [{id: 'key', title: 'key'}];
for (let transKey in trans) {
    headers.push({id: trans[transKey]['language'], title: trans[transKey]['language']});
    temp[trans[transKey]['language']] = [];
    for (let tranElementKey in trans[transKey]['data']) {
        temp[trans[transKey]['language']][tranElementKey] = trans[transKey]['data'][tranElementKey];
    }
}
const res = [];
for (let tempElementKey in temp['ru']) {
    let req = {'key': tempElementKey};
    for (let transKey in temp) {
        req[transKey] = temp[transKey][tempElementKey] ?? '';
    }
    res.push(req);
}


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: headers,
});


csvWriter
    .writeRecords(res)
    .then(()=> console.log('The CSV file was written successfully'));
//fff['data'].forEach((k, v) => )
