import { faker } from '@faker-js/faker';
export default (user, count, dynaLoaderIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            name: faker.date.past(''),
            type: faker.date.past(''),
            fromService: faker.date.past(''),
            toService: faker.date.past(''),
            start: faker.date.past(''),
            end: faker.date.past(''),
            jobId: faker.datatype.boolean(''),
            status: faker.datatype.boolean(''),
            dynaLoaderId: dynaLoaderIdIds[i % dynaLoaderIdIds.length],
            email: faker.lorem.sentence(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
