const winston = require('winston');

const WISTON_CONFIG = {
    level: 'warn',
    transports: [
        new winston.transports.Console({
            level: 'verbose'
        }),
        new winston.transports.File({
            level: 'warn',
            filename: `logs/warn.log`
        }),
        new winston.transports.File({
            level: 'error',
            filename: `logs/error.log`
        })
    ],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => `${info.timestamp} [${info.level}] => ${info.message}`)
    )
}

module.exports = WISTON_CONFIG;