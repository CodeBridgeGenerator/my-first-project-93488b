const { createJobQueWorker } = require('./processJobQueues');
const { createMailQueWorker } = require('./processEmails');
const {
    createUserInvitationOnCreateOnLogin
} = require('./processUserInvitationOnCreateOnLoginQues');

const createWorker = (app) => {
    createJobQueWorker(app);
    createMailQueWorker(app);
    createUserInvitationOnCreateOnLogin(app);
};

module.exports = createWorker;
