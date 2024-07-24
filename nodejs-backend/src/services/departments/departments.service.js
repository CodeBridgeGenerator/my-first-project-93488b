const { Departments } = require('./departments.class');
const createModel = require('../../models/departments.model');
const hooks = require('./departments.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/departments', new Departments(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('departments');

    service.hooks(hooks);
};
