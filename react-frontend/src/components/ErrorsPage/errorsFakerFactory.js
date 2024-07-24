import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            serviceName: faker.lorem.sentence(1),
            error: faker.lorem.sentence(1),
            message: faker.lorem.sentence(1),
            stack: faker.lorem.sentence(1),
            details: faker.lorem.sentence(1),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
