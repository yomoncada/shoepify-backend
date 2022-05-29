const express = require('express');
const formidable = require('express-formidable');
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('../middlewares/passport');

const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')

const dbConfig = require('../config/db.config');
const routes = require('../routers/index');
/* const { MessagesDao, ProductsDao } = require('../model/daos/index'); */
const logger = require('../utils/logger.utils');

const init = (args) => {
    const PORT = args.PORT;

    const app = express()
    const httpServer = new HttpServer(app)
    const io = new SocketServer(httpServer)

    /* const Message = new MessagesDao;
    const Product = new ProductsDao; */

    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    /* app.use(formidable()); */

    app.set('views', './public/views');
    app.set('view engine', 'ejs');

    app.use(session({
        name: 'some-session',
        store: MongoStore.create({ mongoUrl: dbConfig.mongodb.uri }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000
        }
    }))

    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        req.baseUrl = `${req.protocol}://${req.get('host')}/`;
        logger.write('info', `Se recibió una petición a la ruta [${req.method}] ${req.protocol + '://' + req.get('host') + req.originalUrl} en el servidor.`);

        next();
    })

    app.use(routes);

    const connectedServer = httpServer.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })

    connectedServer.on('error', (error) => {
        console.log(error.message)
    })

    io.on('connection', async (socket) => {
        console.log('Me conecté');
        try {
        } catch (error) {
            logger.write('error', `Ocurrio un error: ${error.message} en la api de productos o mensajes.`)
        }
    })
}

module.exports = {
  init
}