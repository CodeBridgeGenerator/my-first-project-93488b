const { Errors } = require('./errors.class');
const createModel = require('../../models/errors.model');
const hooks = require('./errors.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/errors', new Errors(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('errors');

    service.hooks(hooks);
};
