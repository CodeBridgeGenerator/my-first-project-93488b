const { DepartmentHOS } = require('./departmentHOS.class');
const createModel = require('../../models/departmentHOS.model');
const hooks = require('./departmentHOS.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/departmentHOS', new DepartmentHOS(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('departmentHOS');

    service.hooks(hooks);
};
