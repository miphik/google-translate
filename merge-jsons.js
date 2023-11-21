const fs = require('fs');
const existing = require('./existing-tanslations.json');
const newTranslations = require('./new-tanslations.json');

existing.forEach((el, index) => {
    if (!newTranslations[el.language]) {
        console.log(`language ${el.language}, no updates`);
    }
    let updatedKeys = 0;
    for (let newTranslationKey in newTranslations[el.language]) {
        updatedKeys++;
        existing[index]['data'][newTranslationKey] = newTranslations[el.language][newTranslationKey];
    }
    console.log(`language ${el.language}, updated keys: ${updatedKeys}`);
});

fs.writeFileSync("./merge-jsons.json", JSON.stringify(existing));
