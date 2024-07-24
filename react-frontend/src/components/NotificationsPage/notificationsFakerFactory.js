import { faker } from '@faker-js/faker';
export default (user, count, toUserIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            toUser: toUserIds[i % toUserIds.length],
            content: faker.lorem.sentence(1),
            read: faker.lorem.sentence(1),
            sent: faker.lorem.sentence(1),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
