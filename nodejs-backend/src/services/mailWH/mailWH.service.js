const { MailWH } = require('./mailWH.class');
const createModel = require('../../models/mailWH.model');
const hooks = require('./mailWH.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/mailWH', new MailWH(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('mailWH');

    service.hooks(hooks);
};
