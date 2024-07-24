const { DynaFields } = require('./dynaFields.class');
const createModel = require('../../models/dynaFields.model');
const hooks = require('./dynaFields.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/dynaFields', new DynaFields(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('dynaFields');

    service.hooks(hooks);
};
