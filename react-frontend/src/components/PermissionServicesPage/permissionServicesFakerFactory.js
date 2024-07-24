import { faker } from '@faker-js/faker';
export default (user, count, profileIds, roleIdIds, positionIdIds, employeeIdIds, userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            service: faker.lorem.sentence(''),
            create: faker.datatype.boolean(''),
            read: faker.datatype.boolean(''),
            update: faker.datatype.boolean(''),
            delete: faker.datatype.boolean(''),
            profile: profileIds[i % profileIds.length],
            roleId: roleIdIds[i % roleIdIds.length],
            positionId: positionIdIds[i % positionIdIds.length],
            employeeId: employeeIdIds[i % employeeIdIds.length],
            userId: userIdIds[i % userIdIds.length],

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
