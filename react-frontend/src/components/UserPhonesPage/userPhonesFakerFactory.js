import { faker } from '@faker-js/faker';
export default (user, count, userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            userId: userIdIds[i % userIdIds.length],
            countryCode: faker.datatype.number(''),
            operatorCode: faker.datatype.number(''),
            number: faker.datatype.number(''),
            type: 'Land line',

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
