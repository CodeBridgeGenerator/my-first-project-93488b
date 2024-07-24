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
import { Checkbox } from 'primereact/checkbox';
import { AutoComplete } from 'primereact/autocomplete';
import config from '../../resources/config.json';

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

const PermissionServicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [profile, setProfile] = useState([]);
    const [items, setItems] = useState();
    const allItems = _.get(config, 'services').map((s) => {
        return { name: s.displayName, value: s.serviceName };
    });

    useEffect(() => {
        set_entity(props.entity);
        setItems(allItems);
    }, [props.entity, props.show]);

    useEffect(() => {
        //on mount profiles
        client
            .service('profiles')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleProfilesId
                }
            })
            .then((res) => {
                setProfile(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Profiles',
                    type: 'error',
                    message: error.message || 'Failed get profiles'
                });
            });
    }, []);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.service)) {
            error['service'] = `Service field is required`;
            ret = false;
        }

        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            profile: _entity?.profile?._id,
            service: _entity?.service?.value,
            read: _entity?.read,
            readAll: _entity?.readAll,
            updateOwn: _entity?.updateOwn,
            updateAll: _entity?.updateAll,
            deleteOwn: _entity?.deleteOwn,
            deleteAll: _entity?.deleteAll
        };

        setLoading(true);
        try {
            await client.service('permissionServices').patch(_entity._id, _data);
            const eagerResult = await client.service('permissionServices').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
                    $populate: [
                        {
                            path: 'profile',
                            service: 'profiles',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Edit info',
                message: 'Info permissionServices updated successfully'
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

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered;

            if (!event.query.trim().length) {
                _filtered = allItems;
            } else {
                _filtered = allItems.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setItems(_filtered);
        }, 250);
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

    const profileOptions = profile.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Edit Permission Services" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="permissionServices-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="profile">Profile:</label>
                        <Dropdown id="profile" value={_entity?.profile?._id} optionLabel="name" optionValue="value" options={profileOptions} onChange={(e) => setValByKey('profile', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="service">Service:</label>
                        <AutoComplete id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} suggestions={items} field="name" completeMethod={search} onChange={(e) => setValByKey('service', e.value)} dropdown />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="read">Read own:</label>
                        <Checkbox id="read" className="ml-3" checked={_entity?.read} onChange={(e) => setValByKey('read', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="readAll">Read all:</label>
                        <Checkbox id="readAll" className="ml-3" checked={_entity?.readAll} onChange={(e) => setValByKey('readAll', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="updateOwn">Update own:</label>
                        <Checkbox id="updateOwn" className="ml-3" checked={_entity?.updateOwn} onChange={(e) => setValByKey('updateOwn', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="updateAll">Update all:</label>
                        <Checkbox id="updateAll" className="ml-3" checked={_entity?.updateAll} onChange={(e) => setValByKey('updateAll', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deleteOwn">Delete own:</label>
                        <Checkbox id="deleteOwn" className="ml-3" checked={_entity?.deleteOwn} onChange={(e) => setValByKey('deleteOwn', e.checked)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deleteAll">Delete all:</label>
                        <Checkbox id="deleteAll" className="ml-3" checked={_entity?.deleteAll} onChange={(e) => setValByKey('deleteAll', e.checked)} />
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

export default connect(mapState, mapDispatch)(PermissionServicesCreateDialogComponent);
