import { faker } from '@faker-js/faker';
export default (user, count, companyIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            companyId: companyIdIds[i % companyIdIds.length],
            name: faker.lorem.sentence(1),
            code: faker.lorem.sentence(1),
            isDefault: faker.datatype.boolean(),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
