require('dotenv').config()

const PERS = process.env.PERS || 'mongodb';

let ProductsDao;
let CartsDao;
let UsersDao;
let OrdersDao;

switch(PERS) {
    case 'firebase':
        ProductsDao = require('./products/Products.Firebase.dao');
        CartsDao = require('./carts/Carts.Firebase.dao');
        UsersDao = require('./users/Users.Firebase.dao');
        OrdersDao = require('./orders/Orders.Firebase.dao');
        break;
    case 'mongodb':
        ProductsDao = require('./products/Products.MongoDB.dao');
        CartsDao = require('./carts/Carts.MongoDB.dao.js');
        UsersDao = require('./users/Users.MongoDB.dao.js');
        OrdersDao = require('./orders/Orders.MongoDB.dao.js');
        break;
    case 'file':
        ProductsDao = require('./products/Products.File.dao.js');
        CartsDao = require('./carts/Carts.File.dao');
        UsersDao = require('./users/Users.File.dao');
        OrdersDao = require('./orders/Orders.File.dao');
        break;
    case 'memory':
        ProductsDao = require('./products/Products.Memory.dao');
        CartsDao = require('./carts/Carts.Memory.dao.js');
        UsersDao = require('./users/Users.Memory.dao.js');
        OrdersDao = require('./orders/Orders.Memory.dao.js');
        break;
    default:
        throw new Error('Invalid persistent method');
}

module.exports = {
    CartsDao,
    ProductsDao,
    UsersDao,
    OrdersDao
}