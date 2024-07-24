const { CompanyAddresses } = require('./companyAddresses.class');
const createModel = require('../../models/companyAddresses.model');
const hooks = require('./companyAddresses.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/companyAddresses', new CompanyAddresses(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('companyAddresses');

    service.hooks(hooks);
};
