const { ENV: { PERS } } = require('../../../config');

let Product;
let Cart;

switch(PERS) {
    case 'firebase':
        Product = require('./products/FirebaseProductsDao');
        Cart = require('./carts/FirebaseCartsDao');
        break;
    case 'mongodb':
        Product = require('./products/MongoDBProductsDao');
        Cart = require('./carts/MongoDBCartsDao');
        break;
    case 'mariadb':
        Product = require('./products/MariaDBProductsDao');
        Cart = require('./carts/MariaDBCartsDao');
        break;
    case 'sqlite':
        Product = require('./products/SQLiteProductsDao');
        Cart = require('./carts/SQLiteCartsDao');
        break;
    case 'file':
        Product = require('./products/FileProductsDao');
        Cart = require('./carts/FileCartsDao');
        break;
    case 'memory':
        Product = require('./products/MemoryProductsDao');
        Cart = require('./carts/MemoryCartsDao');
        break;
    default:
        throw new Error('Invalid persistent method');
}

module.exports = {
    Cart,
    Product
}