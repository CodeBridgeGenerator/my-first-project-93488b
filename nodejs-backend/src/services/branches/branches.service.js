const { Branches } = require('./branches.class');
const createModel = require('../../models/branches.model');
const hooks = require('./branches.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/branches', new Branches(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('branches');

    service.hooks(hooks);
};
