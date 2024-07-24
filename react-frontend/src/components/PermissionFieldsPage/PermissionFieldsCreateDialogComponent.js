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

const PermissionFieldsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [servicePermissionId, setServicePermissionId] = useState([]);

    useEffect(() => {
        let init = {
            onCreate: false,
            onUpdate: false,
            onDetail: false,
            onTable: false
        };
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [servicePermissionId], setError);
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
            servicePermissionId: _entity?.servicePermissionId?._id,
            fieldName: _entity?.fieldName,
            onCreate: _entity?.onCreate || false,
            onUpdate: _entity?.onUpdate || false,
            onDetail: _entity?.onDetail || false,
            onTable: _entity?.onTable || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('permissionFields').create(_data);
            const eagerResult = await client.service('permissionFields').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'servicePermissionId',
                            service: 'permissionServices',
                            select: ['service']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Field Permissions updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Field Permissions'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        // on mount permissionServices
        client
            .service('permissionServices')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singlePermissionServicesId
                }
            })
            .then((res) => {
                setServicePermissionId(
                    res.data.map((e) => {
                        return { name: e['service'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'PermissionServices',
                    type: 'error',
                    message: error.message || 'Failed get permissionServices'
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

    const servicePermissionIdOptions = servicePermissionId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Field Permissions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="permissionFields-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="servicePermissionId">ServicePermissionId:</label>
                        <Dropdown id="servicePermissionId" value={_entity?.servicePermissionId?._id} optionLabel="name" optionValue="value" options={servicePermissionIdOptions} onChange={(e) => setValByKey('servicePermissionId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['servicePermissionId']) ? (
                            <p className="m-0" key="error-servicePermissionId">
                                {error['servicePermissionId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fieldName">Field Name:</label>
                        <InputText id="fieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fieldName} onChange={(e) => setValByKey('fieldName', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fieldName']) ? (
                            <p className="m-0" key="error-fieldName">
                                {error['fieldName']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onCreate">OnCreate:</label>
                        <Checkbox id="onCreate" className="ml-3" checked={_entity?.onCreate} onChange={(e) => setValByKey('onCreate', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['onCreate']) ? (
                            <p className="m-0" key="error-onCreate">
                                {error['onCreate']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onUpdate">OnUpdate:</label>
                        <Checkbox id="onUpdate" className="ml-3" checked={_entity?.onUpdate} onChange={(e) => setValByKey('onUpdate', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['onUpdate']) ? (
                            <p className="m-0" key="error-onUpdate">
                                {error['onUpdate']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onDetail">OnDetail:</label>
                        <Checkbox id="onDetail" className="ml-3" checked={_entity?.onDetail} onChange={(e) => setValByKey('onDetail', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['onDetail']) ? (
                            <p className="m-0" key="error-onDetail">
                                {error['onDetail']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onTable">OnTable:</label>
                        <Checkbox id="onTable" className="ml-3" checked={_entity?.onTable} onChange={(e) => setValByKey('onTable', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['onTable']) ? (
                            <p className="m-0" key="error-onTable">
                                {error['onTable']}
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

export default connect(mapState, mapDispatch)(PermissionFieldsCreateDialogComponent);
