const { DepartmentHOD } = require('./departmentHOD.class');
const createModel = require('../../models/departmentHOD.model');
const hooks = require('./departmentHOD.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/departmentHOD', new DepartmentHOD(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('departmentHOD');

    service.hooks(hooks);
};
