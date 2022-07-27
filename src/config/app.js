require('dotenv').config()

module.exports = {
    env: {
        port: process.env.PORT || 3000,
        pers: process.env.PERS || 'mongodb'
    }
}