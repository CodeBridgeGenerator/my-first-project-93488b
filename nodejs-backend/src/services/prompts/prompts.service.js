const { Prompts } = require('./prompts.class');
const createModel = require('../../models/prompts.model');
const hooks = require('./prompts.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate']
    };

    // Initialize our service with any options it requires
    app.use('/prompts', new Prompts(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('prompts');

    service.hooks(hooks);
};
