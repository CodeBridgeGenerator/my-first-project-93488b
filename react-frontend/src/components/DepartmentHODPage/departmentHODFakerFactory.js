import { faker } from '@faker-js/faker';
export default (user, count, departmentIdIds, employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            departmentId: departmentIdIds[i % departmentIdIds.length],
            employeeId: employeeIdIds[i % employeeIdIds.length],

            updatedBy: user._id,
            createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
