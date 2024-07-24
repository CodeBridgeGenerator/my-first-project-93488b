import { faker } from '@faker-js/faker';
export default (count, useridIds, chataiidIds, configidIds, saveduseridIds, chatAiIdIds, bankIdIds, facilityidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
            chatAiId: chataiidIds[i % chataiidIds.length],
            configid: configidIds[i % configidIds.length]
        };
        data = [...data, fake];
    }
    return data;
};
