const fs = require('fs');
const readline = require('readline');
const regex = /uuid: (.*)/gm;
const regex3 = /uuid: (.*)/gm;
const regex2 = /retry: (\d?),/gm;

async function processLineByLine() {
    const fileStream = fs.createReadStream('Explore_logs.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    const uuids = {};
    let m;
    let m2;
    let m3;
    let received = 0;
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        if (line.includes('received retry message:')) {
            ++received;
            let uuid = "";
            while ((m = regex.exec(line)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                //m.forEach((match, groupIndex) => {
                //    console.log(`Found match, group ${groupIndex}: ${match}`);
                //});
                uuid = m[1];
                // uuids[m[1]] = line;
            }
            while ((m2 = regex2.exec(line)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m2.index === regex2.lastIndex) {
                    regex2.lastIndex++;
                }
                uuids[uuid] = parseInt(m2[1]);
                // The result can be accessed through the `m`-variable.
                //m.forEach((match, groupIndex) => {
                //    console.log(`Found match, group ${groupIndex}: ${match}`);
                //});
            }
            //if ((m = regex.exec(line)) !== null) {
            //    ++received;
            //    uuids[m[1]] = line;
            //} else {
            //    let fff= 0;
            //}
        }

        // console.log(`Line from file: ${line}`);
    }

    const fileStream2 = fs.createReadStream('Explore_logs.txt');

    const rl2 = readline.createInterface({
        input: fileStream2,
        crlfDelay: Infinity
    });
    for await (const line of rl2) {
        if (line.includes('sent to dlq, failed send message')) {
            while ((m3 = regex3.exec(line)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m3.index === regex3.lastIndex) {
                    regex3.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                //m.forEach((match, groupIndex) => {
                //    console.log(`Found match, group ${groupIndex}: ${match}`);
                //});
                if (uuids[m3[1]] !== undefined) {
                    delete uuids[m3[1]];
                } else {
                    let sss = 0;
                }
                // uuids[m[1]] = line;
            }
        }
    }
    const res = {};
    Object.keys(uuids).forEach((k, v) => {
        if (!res[uuids[k]]) {
            res[uuids[k]] = 0;
        }
        res[uuids[k]] += 1;
    });
    console.log(`Line from file: ${received}, ddd ${uuids.length}`);
}

processLineByLine();


// received retry message: - 8645
// received message: - 115233
// received message from internal queue: - 139764
// rejected message: - 8644

// received messages: - 254997

// sent to dlq, failed send message: - 3795

// delivered after 1 retry - 4698
// after 2 retry - 9
