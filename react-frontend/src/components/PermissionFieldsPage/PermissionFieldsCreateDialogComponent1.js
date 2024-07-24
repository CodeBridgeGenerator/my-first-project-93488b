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
import { AutoComplete } from 'primereact/autocomplete';
import config from '../../resources/config.json';
const allServices = _.get(config, 'services').map((s) => {
    return { name: s.displayName, value: s.serviceName };
});

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
    const [profile, setProfile] = useState([]);
    const [items, setItems] = useState([]);
    const [fieldItems, setFieldItems] = useState([]);

    useEffect(() => {
        let init = {
            read: false,
            readAll: false,
            updateOwn: false,
            updateAll: false,
            deleteOwn: false,
            deleteAll: false
        };
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({ ...init });
        setItems(allServices);
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.service)) {
            error['service'] = `Service field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.fieldId)) {
            error['fieldId'] = `Field is required`;
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
            fieldId: _entity?.fieldId?.value,
            read: _entity?.read || false,
            readAll: _entity?.readAll || false,
            updateOwn: _entity?.updateOwn || false,
            updateAll: _entity?.updateAll || false,
            deleteOwn: _entity?.deleteOwn || false,
            deleteAll: _entity?.deleteAll || false,
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
                title: 'Create info',
                message: 'Info Permission Fields updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Permission Fields'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        // on mount profiles
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

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered;

            if (!event.query.trim().length) {
                _filtered = allServices;
            } else {
                _filtered = allServices.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setItems(_filtered);
        }, 250);
    };

    const searchSubItems = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered;
            const service = _.find(config.services, {
                serviceName: _entity.service.value
            });
            const allFields = service.schemaList.map((f) => {
                return { name: f.label, value: f.fieldName };
            });
            console.log(service, allFields);
            if (!event.query.trim().length) {
                _filtered = allFields;
            } else {
                _filtered = allFields.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFieldItems(_filtered);
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
        <Dialog header="Create Permission Fields" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="permissionFields-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="profile">Profile:</label>
                        <Dropdown id="profile" value={_entity?.profile?._id} optionLabel="name" optionValue="value" options={profileOptions} onChange={(e) => setValByKey('profile', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['profile']) ? (
                            <p className="m-0" key="error-profile">
                                {error['profile']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="service">Service:</label>
                        <AutoComplete id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} suggestions={items} field="name" completeMethod={search} onChange={(e) => setValByKey('service', e.value)} dropdown />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['service']) ? (
                            <p className="m-0" key="error-service">
                                {error['service']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fieldId">Field:</label>
                        <AutoComplete id="fieldId" className="w-full mb-3 p-inputtext-sm" value={_entity?.fieldId} suggestions={fieldItems} field="name" completeMethod={searchSubItems} onChange={(e) => setValByKey('fieldId', e.value)} dropdown disabled={!_entity?.service} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fieldId']) ? (
                            <p className="m-0" key="error-fieldId">
                                {error['fieldId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="read">Read own:</label>
                        <Checkbox id="read" className="ml-3" checked={_entity?.read} onChange={(e) => setValByKey('read', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['read']) ? (
                            <p className="m-0" key="error-read">
                                {error['read']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="readAll">Read all:</label>
                        <Checkbox id="readAll" className="ml-3" checked={_entity?.readAll} onChange={(e) => setValByKey('readAll', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['readAll']) ? (
                            <p className="m-0" key="error-readAll">
                                {error['readAll']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="updateOwn">Update own:</label>
                        <Checkbox id="updateOwn" className="ml-3" checked={_entity?.updateOwn} onChange={(e) => setValByKey('updateOwn', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['updateOwn']) ? (
                            <p className="m-0" key="error-updateOwn">
                                {error['updateOwn']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="updateAll">Update all:</label>
                        <Checkbox id="updateAll" className="ml-3" checked={_entity?.updateAll} onChange={(e) => setValByKey('updateAll', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['updateAll']) ? (
                            <p className="m-0" key="error-updateAll">
                                {error['updateAll']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deleteOwn">Delete own:</label>
                        <Checkbox id="deleteOwn" className="ml-3" checked={_entity?.deleteOwn} onChange={(e) => setValByKey('deleteOwn', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['deleteOwn']) ? (
                            <p className="m-0" key="error-deleteOwn">
                                {error['deleteOwn']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deleteAll">Delete all:</label>
                        <Checkbox id="deleteAll" className="ml-3" checked={_entity?.deleteAll} onChange={(e) => setValByKey('deleteAll', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['deleteAll']) ? (
                            <p className="m-0" key="error-deleteAll">
                                {error['deleteAll']}
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
