const { Positions } = require('./positions.class');
const createModel = require('../../models/positions.model');
const hooks = require('./positions.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/positions', new Positions(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('positions');

    service.hooks(hooks);
};
