import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PermissionFieldsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [servicePermissionId, setServicePermissionId] = useState([]);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
        //on mount permissionServices
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

    const onSave = async () => {
        let _data = {
            servicePermissionId: _entity?.servicePermissionId?._id,
            fieldName: _entity?.fieldName,
            onCreate: _entity?.onCreate,
            onUpdate: _entity?.onUpdate,
            onDetail: _entity?.onDetail,
            onTable: _entity?.onTable
        };

        setLoading(true);
        try {
            await client.service('permissionFields').patch(_entity._id, _data);
            const eagerResult = await client.service('permissionFields').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
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
                title: 'Edit info',
                message: 'Info permissionFields updated successfully'
            });
            props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to update info');
            props.alert({
                type: 'error',
                title: 'Edit info',
                message: 'Failed to update info'
            });
        }
        setLoading(false);
    };

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
        <Dialog header="Edit Field Permissions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="permissionFields-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="servicePermissionId">ServicePermissionId:</label>
                        <Dropdown id="servicePermissionId" value={_entity?.servicePermissionId?._id} optionLabel="name" optionValue="value" options={servicePermissionIdOptions} onChange={(e) => setValByKey('servicePermissionId', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fieldName">Field Name:</label>
                        <InputText id="fieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fieldName} onChange={(e) => setValByKey('fieldName', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onCreate">OnCreate:</label>
                        <Checkbox id="onCreate" className="ml-3" checked={_entity?.onCreate} onChange={(e) => setValByKey('onCreate', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onUpdate">OnUpdate:</label>
                        <Checkbox id="onUpdate" className="ml-3" checked={_entity?.onUpdate} onChange={(e) => setValByKey('onUpdate', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onDetail">OnDetail:</label>
                        <Checkbox id="onDetail" className="ml-3" checked={_entity?.onDetail} onChange={(e) => setValByKey('onDetail', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="onTable">OnTable:</label>
                        <Checkbox id="onTable" className="ml-3" checked={_entity?.onTable} onChange={(e) => setValByKey('onTable', e.checked)} />
                    </span>
                </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="created At:"></Tag>
                        {' ' + moment(_entity?.createdAt).fromNow()}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="created By:"></Tag>
                        {' ' + _entity?.createdBy?.name}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="last Updated At:"></Tag>
                        {' ' + moment(_entity?.updatedAt).fromNow()}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="last Updated By:"></Tag>
                        {' ' + _entity?.updatedBy?.name}
                    </p>
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
