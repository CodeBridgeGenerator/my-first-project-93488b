import { faker } from '@faker-js/faker';
export default (user, count, roleIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            roleId: roleIdIds[i % roleIdIds.length],
            name: faker.lorem.sentence(''),
            description: faker.lorem.sentence(''),
            abbr: faker.lorem.sentence(''),
            isDefault: faker.datatype.boolean(),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
