import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

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

const UserAddressesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
        //on mount users
        client
            .service('users')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleUsersId
                }
            })
            .then((res) => {
                setUserId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Users',
                    type: 'error',
                    message: error.message || 'Failed get users'
                });
            });
    }, []);

    const onSave = async () => {
        let _data = {
            userId: _entity?.userId?._id,
            Street1: _entity?.Street1,
            Street2: _entity?.Street2,
            Poscode: _entity?.Poscode,
            City: _entity?.City,
            State: _entity?.State,
            Province: _entity?.Province,
            Country: _entity?.Country
        };

        setLoading(true);
        try {
            await client.service('userAddresses').patch(_entity._id, _data);
            const eagerResult = await client.service('userAddresses').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
                    $populate: [
                        {
                            path: 'userId',
                            service: 'users',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Edit info',
                message: 'Info userAddresses updated successfully'
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

    const userIdOptions = userId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Edit User Addresses" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="userAddresses-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="userId">User:</label>
                        <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey('userId', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="Street1">Street1:</label>
                        <InputTextarea id="Street1" rows={5} cols={30} value={_entity?.Street1} onChange={(e) => setValByKey('Street1', e.target.value)} autoResize />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="Street2">Street2:</label>
                        <InputTextarea id="Street2" rows={5} cols={30} value={_entity?.Street2} onChange={(e) => setValByKey('Street2', e.target.value)} autoResize />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="Poscode">Poscode:</label>
                        <InputText id="Poscode" className="w-full mb-3 p-inputtext-sm" value={_entity?.Poscode} onChange={(e) => setValByKey('Poscode', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="City">City:</label>
                        <InputText id="City" className="w-full mb-3 p-inputtext-sm" value={_entity?.City} onChange={(e) => setValByKey('City', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="State">State:</label>
                        <InputText id="State" className="w-full mb-3 p-inputtext-sm" value={_entity?.State} onChange={(e) => setValByKey('State', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="Province">Province:</label>
                        <InputText id="Province" className="w-full mb-3 p-inputtext-sm" value={_entity?.Province} onChange={(e) => setValByKey('Province', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="Country">Country:</label>
                        <InputText id="Country" className="w-full mb-3 p-inputtext-sm" value={_entity?.Country} onChange={(e) => setValByKey('Country', e.target.value)} />
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

export default connect(mapState, mapDispatch)(UserAddressesCreateDialogComponent);
