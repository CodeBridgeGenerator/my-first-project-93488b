import { faker } from '@faker-js/faker';
export default (user, count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: 'asdf123',
            status: faker.datatype.boolean()
        };
        data = [...data, fake];
    }
    return data;
};
