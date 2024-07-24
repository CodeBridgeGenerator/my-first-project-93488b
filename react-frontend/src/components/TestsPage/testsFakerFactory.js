import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            stack: faker.lorem.sentence(1),
            service: faker.lorem.sentence(1),
            passed: faker.lorem.sentence(1),
            failed: faker.lorem.sentence(1),
            notes: faker.lorem.sentence(1),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
