const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');
const _ = require('lodash');
const config = require('../resources/config.json');
const { query } = require('@feathersjs/express');

// Create and export the job queue
const jobQueue = new Queue('userInvitationOnCreateOnLoginQues', { connection });

// Create and export the worker
const createUserInvitationOnCreateOnLogin = (app) => {
    const worker = new Worker(
        'userInvitationOnCreateOnLoginQues',
        async (job) => {
            const { data } = job;
            // Add your job processing logic
            // console.log( data);
            if (process.env.USE_USER_INVITE_SIGNUP) {
                // check in userInvites
                let userInvite, firstTimeUser;
                const results = await app.service('userInvites').find({
                    query: {
                        emailToInvite: data.loginEmail
                    }
                });
                if (results) {
                    userInvite = results.data[0];
                    firstTimeUser = !results.data[0].status;
                }
                // console.log("firstTimeUser",firstTimeUser,"userInvite",userInvite);
                if (firstTimeUser && userInvite) {
                    const employeeResults = await app
                        .service('employees')
                        .find({
                            query: {
                                userEmail: userInvite.emailToInvite,
                                $populate: [
                                    {
                                        path: 'company',
                                        service: 'companies',
                                        select: ['name']
                                    },
                                    {
                                        path: 'department',
                                        service: 'departments',
                                        select: ['name']
                                    },
                                    {
                                        path: 'section',
                                        service: 'sections',
                                        select: ['name']
                                    },
                                    {
                                        path: 'position',
                                        service: 'positions',
                                        select: ['name']
                                    },
                                    {
                                        path: 'supervisor',
                                        service: 'employees',
                                        select: ['name']
                                    }
                                ]
                            }
                        });

                    const userData = await app.service('users').find({
                        query: { email: data.loginEmail }
                    });

                    let result = true;
                    if (employeeResults?.data[0]) {
                        result = await userSetupCreateProfile(
                            app,
                            employeeResults?.data[0],
                            userData.data[0],
                            job
                        );
                    }

                    await app
                        .service('userInvites')
                        .patch(userInvite._id, { status: result });
                }
            }
        },
        { connection }
    );

    // Event listeners for worker
    worker.on('completed', (job) => {
        console.log(`Job ${job.id} completed successfully`);
        if (job.data) {
            const _mail = {
                name: 'on_new_user_welcome_email',
                type: 'firstimelogin',
                from: 'info@cloudbasha.com',
                recipients: [job?.data?.loginEmail],
                data: { id: job.id },
                status: true,
                subject: 'login processing success',
                templateId: 'onWelcomeEmail'
            };
            app.service('mailQues').create(_mail);
        } else {
            console.log(`Job error and ${job.data} data not found`);
        }
    });

    worker.on('failed', async (job, err) => {
        console.error(`Job ${job.id} failed with error ${err.message}`);
        if (job.data) {
            const _mail = {
                name: 'on_send_welcome_email',
                type: 'userInvitationOnCreateOnLoginQues',
                from: 'admin@cloudbasha.com',
                recipients: ['support@cloudbasha.com'],
                status: false,
                subject: 'login processing failed',
                templateId: 'onError'
            };
            app.service('mailQues').create(_mail);
        } else {
            console.log(`Job error and ${job.data} data not found`);
        }
    });

    const userLoginService = app.service('userLogin');
    userLoginService.hooks({
        after: {
            create: async (context) => {
                const { result } = context;
                await jobQueue.add('userInvitationOnCreateOnLoginQues', result);
                return context;
            }
        }
    });
};

const userSetupCreateProfile = (app, employeeResult, user, job) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create profile
            // console.log("employeeResult", employeeResult);
            // console.log("user", user);
            if (employeeResult) {
                const hodData = app.service('departmentHOD').find({
                    query: {
                        departmentId: employeeResult?.department?._id,
                        employeeId: employeeResult?._id
                    }
                });

                const hosData = app.service('departmentHOS').find({
                    query: {
                        sectionId: employeeResult?.section?._id,
                        employeeId: employeeResult?._id
                    }
                });

                let managerData = {};
                const subordinateData = app.service('staffinfo').find({
                    query: {
                        empno: employeeResult?.empNo
                    }
                });

                if (subordinateData?.data?.length > 0) {
                    managerData = app.service('staffinfo').find({
                        query: {
                            empno: subordinateData?.data[0]?.supervisor
                        }
                    });
                } else managerData['data'] = [];

                let _data = {
                    name: employeeResult?.fullname,
                    userId: user._id,
                    image: '/assets/images/blocks/defaults/blanck_user.png',
                    bio: 'Please write something about yourself.',
                    department: employeeResult?.department?._id,
                    hod: hodData?.data?.length === 1 || false,
                    section: employeeResult?.section?._id,
                    hos: hosData?.data?.length === 1 || false,
                    position: employeeResult?.position?._id,
                    manager: null,
                    company: employeeResult?.company?._id,
                    branch: employeeResult?.branch?._id,
                    skills: [],
                    createdBy: job.data?.createdBy,
                    updatedBy: job.data?.updatedBy
                };

                await app.service('profiles').create(_data);
            }
            resolve(true);
        } catch (error) {
            console.debug('error', error);
            reject(false);
        }
    });
};

module.exports = { createUserInvitationOnCreateOnLogin };
