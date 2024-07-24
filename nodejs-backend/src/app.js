const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const createWorker = require('./workersQue');
const genAi = require('./routes/genAi');
const redisApp = require('./services/redis');
const authentication = require('./authentication');
const mongoose = require('./mongoose');
const setup = require('./setup');

const app = express(feathers());
// Load app socketio
app.configure(socketio());
// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));
// Set up Plugins and providers
app.configure(express.rest());
app.configure(mongoose);
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// Set up job queues
createWorker(app);
// Configure a middleware for 404s and the error handler
app.configure(genAi);
app.configure(redisApp);
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
app.hooks(appHooks);
// Initialize setup on app start
setup(app).catch((err) => console.error('Setup error:', err));
module.exports = app;
