import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            empno: faker.lorem.sentence(''),
            name: faker.lorem.sentence(''),
            namenric: faker.lorem.sentence(''),
            compcode: faker.lorem.sentence(''),
            compname: faker.lorem.sentence(''),
            deptcode: faker.lorem.sentence(''),
            deptdesc: faker.lorem.sentence(''),
            sectcode: faker.lorem.sentence(''),
            sectdesc: faker.lorem.sentence(''),
            designation: faker.lorem.sentence(''),
            email: faker.lorem.sentence(''),
            resign: faker.lorem.sentence(''),
            supervisor: faker.lorem.sentence(''),
            datejoin: faker.lorem.sentence(''),
            empgroup: faker.lorem.sentence(''),
            empgradecode: faker.lorem.sentence(''),
            terminationdate: faker.lorem.sentence(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
