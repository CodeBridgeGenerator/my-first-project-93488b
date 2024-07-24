const entityCreate = (location, setRecord) => {
    if (location?.state?.data?.loader) {
        let query = {};
        query['toService'] = location?.state?.data?.toRefService;
        let hasParent = _.filter(location?.state?.data?.loaderFields, query);
        if (hasParent?.length === 0) {
            query['toService'] = location?.state?.data?.toService;
            hasParent = _.filter(location?.state?.data?.loaderFields, query);
        }
        if (hasParent?.length > 0) {
            const rec = {};
            hasParent.forEach((field) => {
                if (field?.toRefService) {
                    const data = location?.state?.data?.source[field?.from];
                    const recId = {};
                    recId[field?.identifierFieldName] = data;
                    recId['toRefService'] = field?.toRefService;
                    recId['field'] = field?.to2;
                    recId['value'] = data;
                    rec[field?.to2] = recId;
                } else {
                    const data = location?.state?.data?.source[field?.from];
                    rec[field?.to2] = data;
                }
            });
            // console.log("rec", rec);
            setRecord(rec);
        }
    }
};
export default entityCreate;
