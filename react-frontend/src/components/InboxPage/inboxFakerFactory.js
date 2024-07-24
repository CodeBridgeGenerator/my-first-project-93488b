import { faker } from '@faker-js/faker';
export default (user, count, fromIds, toUserIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            from: fromIds[i % fromIds.length],
            toUser: toUserIds[i % toUserIds.length],
            content: faker.date.past(''),
            read: faker.date.past(''),
            sent: faker.date.past(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
