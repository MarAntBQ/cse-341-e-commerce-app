const getDb = require('../util/database').getDb;

class Product {
    constructor(title, isbn, price, description, author, pyear) {
        //this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.price = price;
        this.description = description;
        this.author = author;
        this.pyear = pyear;
    }

    save() {
        const db = getDb();
        db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;