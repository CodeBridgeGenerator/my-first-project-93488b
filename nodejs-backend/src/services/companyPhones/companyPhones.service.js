const { CompanyPhones } = require('./companyPhones.class');
const createModel = require('../../models/companyPhones.model');
const hooks = require('./companyPhones.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/companyPhones', new CompanyPhones(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('companyPhones');

    service.hooks(hooks);
};
