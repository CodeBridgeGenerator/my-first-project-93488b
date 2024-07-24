const { Tickets } = require('./tickets.class');
const createModel = require('../../models/tickets.model');
const hooks = require('./tickets.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate']
    };

    // Initialize our service with any options it requires
    app.use('/tickets', new Tickets(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('tickets');

    service.hooks(hooks);
};
