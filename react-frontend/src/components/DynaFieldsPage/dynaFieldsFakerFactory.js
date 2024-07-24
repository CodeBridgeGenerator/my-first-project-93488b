import { faker } from '@faker-js/faker';
export default (user, count, dynaLoaderIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            dynaLoader: dynaLoaderIds[i % dynaLoaderIds.length],
            from: faker.lorem.sentence('8'),
            fromType: faker.lorem.sentence(''),
            to2: faker.lorem.sentence('8'),
            toType: faker.lorem.sentence('8'),
            fromRefService: faker.lorem.sentence('8'),
            toRefService: faker.lorem.sentence('8'),
            fromIdentityFieldName: faker.lorem.sentence('8'),
            toIdentityFieldName: faker.lorem.sentence('8'),
            fromRelationship: faker.lorem.sentence('8'),
            toRelationship: faker.lorem.sentence('8'),
            duplicates: faker.datatype.boolean(''),

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
