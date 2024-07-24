const { Inbox } = require('./inbox.class');
const createModel = require('../../models/inbox.model');
const hooks = require('./inbox.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/inbox', new Inbox(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('inbox');

    service.hooks(hooks);
};
