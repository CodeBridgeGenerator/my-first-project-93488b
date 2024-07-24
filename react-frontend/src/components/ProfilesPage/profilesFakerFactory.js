import { faker } from '@faker-js/faker';
export default (user, count, userIdIds, departmentIds, sectionIds, positionIds, managerIds, companyIds, branchIds, addressIds, phoneIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            name: faker.lorem.sentence(''),
            userId: userIdIds[i % userIdIds.length],
            image: faker.lorem.sentence(''),
            bio: faker.lorem.sentence(''),
            department: departmentIds[i % departmentIds.length],
            hod: faker.datatype.boolean(''),
            section: sectionIds[i % sectionIds.length],
            hos: faker.datatype.boolean(''),
            position: positionIds[i % positionIds.length],
            manager: managerIds[i % managerIds.length],
            company: companyIds[i % companyIds.length],
            branch: branchIds[i % branchIds.length],
            skills: faker.lorem.sentence(''),
            address: addressIds[i % addressIds.length],
            phone: phoneIds[i % phoneIds.length],

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
