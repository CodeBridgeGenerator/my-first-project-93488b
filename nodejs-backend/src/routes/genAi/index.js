const express = require('@feathersjs/express');
const claude3Haiku = require('./claude3Haiku');
const claude3sonnet = require('./claude3sonnet');
const claude3Opus = require('./claude3Opus');

module.exports = function (app) {
    app.post(
        '/claude3haiku',
        express.raw({ type: 'application/json' }),
        claude3Haiku
    );
    // claude3sonnet
    app.post(
        '/claude3sonnet',
        express.raw({ type: 'application/json' }),
        claude3sonnet
    );
    // claude3Opus
    app.post(
        '/claude3Opus',
        express.raw({ type: 'application/json' }),
        claude3Opus
    );
};
