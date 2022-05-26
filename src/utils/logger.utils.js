const winston = require('winston');
const wistonConfig = require('../config/wiston.config.js');

const logger = winston.createLogger(wistonConfig);

const write = (level, message) => {
    try {
        switch (level) {
            case 'info':
                logger.info(message);
                break;
            case 'warn':
                logger.warn(message);
                break;
            case 'error':
                logger.error(message);
                break;
            case 'debug':
                logger.debug(message);
                break;
        }
    } catch(error) {
        logger.error(error.message);
    }
}

module.exports = {
    write
}