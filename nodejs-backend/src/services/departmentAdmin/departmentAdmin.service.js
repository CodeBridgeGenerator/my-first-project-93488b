const { DepartmentAdmin } = require('./departmentAdmin.class');
const createModel = require('../../models/departmentAdmin.model');
const hooks = require('./departmentAdmin.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/departmentAdmin', new DepartmentAdmin(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('departmentAdmin');

    service.hooks(hooks);
};
