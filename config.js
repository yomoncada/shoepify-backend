const path = require('path');
require('dotenv').config()
const firebaseConfig = require('./src/db/firebase/firebase.config.json');

const MARIADB_HOST = process.env.MARIADB_HOST || '127.0.0.10';
const MARIADB_PORT = process.env.MARIADB_PORT || 3306;
const MARIADB_USER = process.env.MARIADB_USER || 'root';
const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD || '12345678';
const MARIADB_DATABASE = process.env.MARIADB_DATABASE || 'ecommerce';

const SQLITE_FILENAME = process.env.SQLITE_FILENAME || path.resolve(__dirname, `./ecommerce.sqlite`);

const MONGODB_USER = 'yomoncada';
const MONGODB_PASSWORD = '123123123';
const MONGODB_DOMAIN = 'ecommerce.gsqun.mongodb.net';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ecommerce';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DOMAIN}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

module.exports = {
    ENV: {
        PORT: process.env.PORT || 8080,
        PERS: process.env.PERS || 'file'
    },
    DB_CONFIG: {
        mariadb: {
            client: 'mysql',
            connection: {
              host: MARIADB_HOST,
              port: MARIADB_PORT,
              user: MARIADB_USER,
              password: MARIADB_PASSWORD,
              database: MARIADB_DATABASE
            }
        },
        sqlite: {
            client: 'sqlite3',
            connection: {
              filename: SQLITE_FILENAME
            }
        },
        mongodb: {
            uri: MONGODB_URI
        },
        firebase: {
            certification: firebaseConfig
        }
    }
}