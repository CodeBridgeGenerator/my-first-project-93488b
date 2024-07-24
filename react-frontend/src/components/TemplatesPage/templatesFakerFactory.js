import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            name: faker.lorem.sentence(1),
            subject: faker.lorem.sentence(1),
            body: faker.lorem.sentence(1),
            variables: faker.lorem.sentence(1),
            image: faker.lorem.sentence(1),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
