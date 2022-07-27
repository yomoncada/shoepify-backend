require('dotenv').config()
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PassportMiddleware = require('./app/Middlewares/PassportMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const databaseConfig = require('./config/database')
const routes = require('./routes/routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

app.use(session({
    name: 'some-session',
    store: MongoStore.create({ mongoUrl: databaseConfig.mongodb.uri }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000
    }
}))

app.use(PassportMiddleware.initialize());
app.use(PassportMiddleware.session());
app.use(logger('dev'));

app.use('/static', express.static(path.join(__dirname, '../public')))
app.use(routes);

module.exports = app;
