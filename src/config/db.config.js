require('dotenv').config()
const firebaseConfig = require('../db/firebase/firebase.config.json');

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DOMAIN}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

module.exports = {
    mongodb: {
        uri: MONGODB_URI
    },
    firebase: {
        certification: firebaseConfig
    }
}