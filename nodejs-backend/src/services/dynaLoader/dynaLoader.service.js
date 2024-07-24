const { DynaLoader } = require('./dynaLoader.class');
const createModel = require('../../models/dynaLoader.model');
const hooks = require('./dynaLoader.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/dynaLoader', new DynaLoader(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('dynaLoader');

    service.hooks(hooks);
};
