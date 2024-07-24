import { faker } from '@faker-js/faker';
export default (user, count, sectionIdIds, employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            sectionId: sectionIdIds[i % sectionIdIds.length],
            employeeId: employeeIdIds[i % employeeIdIds.length],

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
