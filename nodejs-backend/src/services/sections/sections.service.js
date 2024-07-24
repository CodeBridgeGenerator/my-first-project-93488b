const { Sections } = require('./sections.class');
const createModel = require('../../models/sections.model');
const hooks = require('./sections.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/sections', new Sections(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('sections');

    service.hooks(hooks);
};
