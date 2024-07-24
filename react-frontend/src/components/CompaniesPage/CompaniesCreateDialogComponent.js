import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

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

const CompaniesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        let init = { companyNo: 'Cas', isdefault: false };
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.companyNo)) {
            error['companyNo'] = `Company no field is required`;
            ret = false;
        }
        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            name: _entity?.name,
            companyNo: _entity?.companyNo,
            newCompanyNumber: _entity?.newCompanyNumber,
            DateIncorporated: _entity?.DateIncorporated,
            addresses: _entity?.addresses?._id,
            isdefault: _entity?.isdefault,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('companies').create(_data);
            const eagerResult = await client.service('companies').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'addresses',
                            service: 'companyAddresses',
                            select: ['Street1']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Companies updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Companies'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        // on mount companyAddresses
        client
            .service('companyAddresses')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleCompanyAddressesId
                }
            })
            .then((res) => {
                setAddresses(
                    res.data.map((e) => {
                        return { name: e['Street1'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'CompanyAddresses',
                    type: 'error',
                    message: error.message || 'Failed get companyAddresses'
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

    const addressesOptions = addresses.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Companies" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="companies-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="name">Name:</label>
                        <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey('name', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['name']) ? (
                            <p className="m-0" key="error-name">
                                {error['name']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="companyNo">Company no:</label>
                        <InputText id="companyNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyNo} onChange={(e) => setValByKey('companyNo', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['companyNo']) ? (
                            <p className="m-0" key="error-companyNo">
                                {error['companyNo']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="newCompanyNumber">New company number:</label>
                        <InputNumber id="newCompanyNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.newCompanyNumber} onChange={(e) => setValByKey('newCompanyNumber', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['newCompanyNumber']) ? (
                            <p className="m-0" key="error-newCompanyNumber">
                                {error['newCompanyNumber']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="DateIncorporated">Date Incorporated:</label>
                        <Calendar id="DateIncorporated" value={_entity?.DateIncorporated ? new Date(_entity?.DateIncorporated) : new Date()} dateFormat="dd/mm/yy" onChange={(e) => setValByKey('DateIncorporated', new Date(e.target.value))} showIcon showButtonBar />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['DateIncorporated']) ? (
                            <p className="m-0" key="error-DateIncorporated">
                                {error['DateIncorporated']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="addresses">Addresses:</label>
                        <Dropdown id="addresses" value={_entity?.addresses?._id} optionLabel="name" optionValue="value" options={addressesOptions} onChange={(e) => setValByKey('addresses', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['addresses']) ? (
                            <p className="m-0" key="error-addresses">
                                {error['addresses']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="isdefault">Is default:</label>
                        <Checkbox id="isdefault" className="ml-3" checked={_entity?.isdefault} onChange={(e) => setValByKey('isdefault', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['isdefault']) ? (
                            <p className="m-0" key="error-isdefault">
                                {error['isdefault']}
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

export default connect(mapState, mapDispatch)(CompaniesCreateDialogComponent);
