const { MailQues } = require('./mailQues.class');
const createModel = require('../../models/mailQues1.model');
const hooks = require('./mailQues.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/mailQues', new MailQues(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('mailQues');

    service.hooks(hooks);
};
