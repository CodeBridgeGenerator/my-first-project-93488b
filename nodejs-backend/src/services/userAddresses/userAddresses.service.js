const { UserAddresses } = require('./userAddresses.class');
const createModel = require('../../models/userAddresses.model');
const hooks = require('./userAddresses.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/userAddresses', new UserAddresses(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('userAddresses');

    service.hooks(hooks);
};
