const { Companies } = require('./companies.class');
const createModel = require('../../models/companies.model');
const hooks = require('./companies.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/companies', new Companies(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('companies');

    service.hooks(hooks);
};
