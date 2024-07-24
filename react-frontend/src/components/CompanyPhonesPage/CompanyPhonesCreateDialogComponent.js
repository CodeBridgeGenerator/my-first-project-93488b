import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
const typeArray = ['Land line', 'Mobile', 'Fax'];
const typeOptions = typeArray.map((x) => ({ name: x, value: x }));
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg[key] = element.message;
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error: errorObj.message } : {};
};

const CompanyPhonesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [companyId, setCompanyId] = useState([]);

    useEffect(() => {
        let init = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            companyId: _entity?.companyId?._id,
            countryCode: _entity?.countryCode,
            operatorCode: _entity?.operatorCode,
            number: _entity?.number,
            type: _entity?.type,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('companyPhones').create(_data);
            const eagerResult = await client.service('companyPhones').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'companyId',
                            service: 'companies',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Company Phones updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Company Phones'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        // on mount companies
        client
            .service('companies')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleCompaniesId
                }
            })
            .then((res) => {
                setCompanyId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Companies',
                    type: 'error',
                    message: error.message || 'Failed get companies'
                });
            });
    }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const companyIdOptions = companyId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Company Phones" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="companyPhones-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="companyId">Company:</label>
                        <Dropdown id="companyId" value={_entity?.companyId?._id} optionLabel="name" optionValue="value" options={companyIdOptions} onChange={(e) => setValByKey('companyId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['companyId']) ? (
                            <p className="m-0" key="error-companyId">
                                {error['companyId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="countryCode">Country code:</label>
                        <InputText id="countryCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.countryCode} onChange={(e) => setValByKey('countryCode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['countryCode']) ? (
                            <p className="m-0" key="error-countryCode">
                                {error['countryCode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="operatorCode">Operator code:</label>
                        <InputText id="operatorCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.operatorCode} onChange={(e) => setValByKey('operatorCode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['operatorCode']) ? (
                            <p className="m-0" key="error-operatorCode">
                                {error['operatorCode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="number">Number:</label>
                        <InputText id="number" className="w-full mb-3 p-inputtext-sm" value={_entity?.number} onChange={(e) => setValByKey('number', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['number']) ? (
                            <p className="m-0" key="error-number">
                                {error['number']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="type">Type:</label>
                        <Dropdown id="type" value={_entity?.type} options={typeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey('type', e.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['type']) ? (
                            <p className="m-0" key="error-type">
                                {error['type']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <small className="p-error">
                    {Array.isArray(Object.keys(error))
                        ? Object.keys(error).map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}: {error[e]}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(CompanyPhonesCreateDialogComponent);
