const { Chatai } = require('./chatai.class');
const createModel = require('../../models/chatai.model');
const hooks = require('./chatai.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate']
    };

    // Initialize our service with any options it requires
    app.use('/chatai', new Chatai(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('chatai');

    service.hooks(hooks);
};
