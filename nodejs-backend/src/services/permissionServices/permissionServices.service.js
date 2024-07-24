const { PermissionServices } = require('./permissionServices.class');
const createModel = require('../../models/permissionServices.model');
const hooks = require('./permissionServices.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/permissionServices', new PermissionServices(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('permissionServices');

    service.hooks(hooks);
};
