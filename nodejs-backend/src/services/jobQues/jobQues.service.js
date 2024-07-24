const { JobQues } = require('./jobQues.class');
const createModel = require('../../models/jobQues.model');
const hooks = require('./jobQues.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
        multi: ['create']
    };

    // Initialize our service with any options it requires
    app.use('/jobQues', new JobQues(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('jobQues');

    service.hooks(hooks);
};
