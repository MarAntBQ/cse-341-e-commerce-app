const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'nosqldata',
    'week8.json'
);

const getDataFromFile = cb => {
    
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Informations {
    
    static fetchAll(cb) {
        getDataFromFile(cb);
    }
}
