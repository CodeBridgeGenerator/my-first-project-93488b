const { PermissionFields } = require('./permissionFields.class');
const createModel = require('../../models/permissionFields.model');
const hooks = require('./permissionFields.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/permissionFields', new PermissionFields(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('permissionFields');

    service.hooks(hooks);
};
