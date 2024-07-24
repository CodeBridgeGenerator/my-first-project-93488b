const { UserPhones } = require('./userPhones.class');
const createModel = require('../../models/userPhones.model');
const hooks = require('./userPhones.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/userPhones', new UserPhones(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('userPhones');

    service.hooks(hooks);
};
