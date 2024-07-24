const { Staffinfo } = require('./staffinfo.class');
const createModel = require('../../models/staffinfo.model');
const hooks = require('./staffinfo.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/staffinfo', new Staffinfo(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('staffinfo');

    service.hooks(hooks);
};
