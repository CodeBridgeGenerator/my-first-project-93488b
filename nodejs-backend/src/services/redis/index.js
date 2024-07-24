const express = require('@feathersjs/express');
const getRedisData = require('./getRedisData');
const setRedisData = require('./setRedisData');

module.exports = function (app) {
    app.get(
        '/cache/:id',
        express.raw({ type: 'application/json' }),
        getRedisData
    );
    app.post(
        '/cache/:id',
        express.raw({ type: 'application/json' }),
        setRedisData
    );
};
