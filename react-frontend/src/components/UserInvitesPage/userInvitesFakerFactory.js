import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            emailToInvite: faker.datatype.boolean(''),
            status: faker.datatype.boolean(''),
            code: faker.datatype.number(''),
            sendMailCounter: faker.lorem.sentence(1),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
