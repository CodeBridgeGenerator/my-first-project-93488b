const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');
const sendMailService = require('../services/nodeMailer/sendMailService');

// Create and export the job queue
const mailQues = new Queue('mailQues', { connection });

const createMailQueWorker = (app) => {
    const worker = new Worker(
        'mailQues',
        async (job) => {
            const { id, data } = job;
            // Add your job processing logic here
            // console.log("data", data);
            const template = await app
                .service('templates')
                .find({ query: { name: data.templateId } });

            if (!template)
                throw Error(
                    `Template ${data.templateId} not found, please create.`
                );

            const templateContent = template.data[0];
            // console.log("template", template);
            const subject = templateContent.subject;
            // console.log("subject", subject);
            let body = templateContent.body;
            let contentHTML = body;
            if (data?.data) {
                Object.entries(data.data).forEach((k) => {
                    // console.log(k);
                    contentHTML = contentHTML.replace(`{{${k[0]}}}`, k[1]);
                });
            }
            app.service('mailQues').patch(job.data?._id, {
                jobId: job.id,
                content: contentHTML
            });
            try {
                // console.log("name",data.name,"from",data.from,"to",data.recipients,"subject",subject,"body",body,"html",contentHTML)
                // console.log(contentHTML);
                await sendMailService(
                    data.name,
                    data.from,
                    data.recipients,
                    subject,
                    body,
                    contentHTML,
                    []
                );
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        { connection }
    );

    // Event listeners for worker
    worker.on('completed', (job) => {
        console.log(`Mail ${job.id} completed successfully`);
        if (job.data) {
            app.service('mailQues').patch(job.data?._id, {
                jobId: job.id,
                end: new Date(),
                status: true
            });
        }
    });

    worker.on('failed', (job, err) => {
        console.error(`Mail ${job.id} failed with error ${err.message}`);
        if (job.data) {
            app.service('mailQues').patch(job.data?._id, {
                jobId: job.id,
                end: new Date(),
                errors: err.message,
                status: false
            });
        }
    });

    const mailQuesService = app.service('mailQues');
    mailQuesService.hooks({
        after: {
            create: async (context) => {
                const { result } = context;
                await mailQues.add('mailQues', result);
                return context;
            }
        }
    });
};

module.exports = { createMailQueWorker };
