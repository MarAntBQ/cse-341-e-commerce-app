const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, isbn, price, description, author, pyear, id, userId) {
        //this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.price = price;
        this.description = description;
        this.author = author;
        this.pyear = pyear;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update the prod.
            dbOp = db
                .collection('products')
                .updateOne({
                    _id: this._id
                }, {
                    $set: this
                });
        } else {
            dbOp = db
                .collection('products')
                .insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({
                _id: new mongodb.ObjectId(prodId)
            })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;