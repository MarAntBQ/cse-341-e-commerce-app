const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://MarAntBQ:twG4DxEpNKuZ8Ooq@cluster0.wjhk8.mongodb.net/shop?retryWrites=true&w=majority";
const mongoConnect = callback => {
    MongoClient.connect(
        //'mongodb+srv://MarAntBQ:twG4DxEpNKuZ8Ooq@cluster0.wjhk8.mongodb.net/shop?retryWrites=true&w=majority'
        MONGODB_URL
        )
        .then(client => {
            console.log('Connected Mijin!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
