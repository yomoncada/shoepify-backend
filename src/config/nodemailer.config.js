require('dotenv').config();

const NODEMAILER_CONFIG = {
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS
    }
};

module.exports = NODEMAILER_CONFIG;