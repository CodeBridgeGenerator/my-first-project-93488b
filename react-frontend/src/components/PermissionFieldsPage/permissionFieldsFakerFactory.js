import { faker } from '@faker-js/faker';
export default (user, count, servicePermissionIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            servicePermissionId: servicePermissionIdIds[i % servicePermissionIdIds.length],
            fieldName: faker.lorem.sentence(''),
            onCreate: faker.datatype.boolean(),
            onUpdate: faker.datatype.boolean(),
            onDetail: faker.datatype.boolean(),
            onTable: faker.datatype.boolean(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
