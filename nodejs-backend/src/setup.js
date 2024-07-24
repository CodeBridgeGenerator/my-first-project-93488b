// Your setup function
module.exports = async (app) => {
    await initializeDatabase(app);
    console.log('Setup completed.');
};

const initializeDatabase = async (app) => {
    const userEmail = 'kana.sabaratnam@gmail.com';
    const getUserEmail = await app.service('userInvites').find({
        query: {
            emailToInvite: userEmail
        }
    });

    if (getUserEmail?.data?.length === 0) {
        const user = await app.service('userInvites').create({
            emailToInvite: userEmail,
            status: false,
            sendMailCounter: 0
        });
        console.debug('user created');
        await insertEmailTemplates(app, user._id);
    } else {
        await insertEmailTemplates(app, getUserEmail?.data[0]?._id);
        console.debug('user exists ');
    }
};

const insertEmailTemplates = async (app, id) => {
    const templates = require('./resources/codebridge-standard-app.templates.json');
    const existingTemplates = await app.service('templates').find({});
    const templateNames = existingTemplates?.data?.map((t) => t.name);

    const inserts = [];
    templates.forEach((t, i) => {
        if (!templateNames?.includes(t.name)) {
            const temp = templates[i];
            delete temp._id;
            delete temp.__v;
            delete temp.createdAt;
            delete temp.updatedAt;
            temp.createdBy = id;
            temp.updatedBy = id;
            inserts.push(temp);
        }
    });
    if (inserts?.length > 0) {
        await app.service('templates').create(inserts);
        console.debug('inserted', inserts?.length);
    }
};
