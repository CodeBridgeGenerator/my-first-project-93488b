const { ErrorsWH } = require('./errorsWH.class');
const createModel = require('../../models/errorsWH.model');
const hooks = require('./errorsWH.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/errorsWH', new ErrorsWH(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('errorsWH');

    service.hooks(hooks);
};
