import { faker } from '@faker-js/faker';
export default (user, count, companyIds, departmentIds, sectionIds, positionIds, supervisorIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            empNo: faker.lorem.sentence(''),
            name: faker.lorem.sentence(''),
            fullname: faker.lorem.sentence(''),
            userEmail: faker.lorem.sentence(''),
            company: companyIds[i % companyIds.length],
            department: departmentIds[i % departmentIds.length],
            section: sectionIds[i % sectionIds.length],
            position: positionIds[i % positionIds.length],
            supervisor: supervisorIds[i % supervisorIds.length],
            dateJoined: faker.date.past(''),
            dateTerminated: faker.date.past(''),
            resigned: faker.lorem.sentence(''),
            empGroup: faker.lorem.sentence(''),
            empCode: faker.lorem.sentence(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
