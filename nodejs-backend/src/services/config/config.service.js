const { Config } = require('./config.class');
const createModel = require('../../models/config.model');
const hooks = require('./config.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate']
    };

    // Initialize our service with any options it requires
    app.use('/config', new Config(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('config');

    service.hooks(hooks);
};
