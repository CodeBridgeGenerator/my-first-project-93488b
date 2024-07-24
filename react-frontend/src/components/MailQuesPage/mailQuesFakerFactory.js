import { faker } from '@faker-js/faker';
export default (user, count, templateIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            name: faker.lorem.sentence(''),
            from: faker.lorem.sentence(''),
            recipients: faker.lorem.sentence(''),
            status: faker.datatype.number(''),
            templateId: templateIdIds[i % templateIdIds.length],
            subject: faker.lorem.sentence(''),
            content: faker.lorem.sentence(''),
            jobId: faker.datatype.number(''),
            errors: faker.lorem.sentence(''),
            end: faker.date.past(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
