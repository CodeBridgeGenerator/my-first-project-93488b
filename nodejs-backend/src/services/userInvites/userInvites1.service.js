const { UserInvites } = require('./userInvites.class');
const createModel = require('../../models/userInvites1.model');
const hooks = require('./userInvites1.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/userInvites', new UserInvites(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('userInvites');

    service.hooks(hooks);
};
