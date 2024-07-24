const { Templates } = require('./templates.class');
const createModel = require('../../models/templates.model');
const hooks = require('./templates.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/templates', new Templates(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('templates');

    service.hooks(hooks);
};
