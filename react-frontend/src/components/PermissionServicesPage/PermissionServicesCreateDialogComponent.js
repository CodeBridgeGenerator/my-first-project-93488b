import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';

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

const PermissionServicesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [profile, setProfile] = useState([]);
    const [roleId, setRoleId] = useState([]);
    const [positionId, setPositionId] = useState([]);
    const [employeeId, setEmployeeId] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        let init = { create: false };
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [profile, roleId, positionId, employeeId, userId], setError);
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
            service: _entity?.service,
            create: _entity?.create || false,
            read: _entity?.read,
            update: _entity?.update,
            delete: _entity?.delete,
            profile: _entity?.profile?._id,
            roleId: _entity?.roleId?._id,
            positionId: _entity?.positionId?._id,
            employeeId: _entity?.employeeId?._id,
            userId: _entity?.userId?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('permissionServices').create(_data);
            const eagerResult = await client.service('permissionServices').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'profile',
                            service: 'profiles',
                            select: ['name']
                        },
                        {
                            path: 'roleId',
                            service: 'roles',
                            select: ['name']
                        },
                        {
                            path: 'positionId',
                            service: 'positions',
                            select: ['name']
                        },
                        {
                            path: 'employeeId',
                            service: 'employees',
                            select: ['name']
                        },
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
                title: 'Create info',
                message: 'Info Service Permissions updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Service Permissions'
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

    useEffect(() => {
        // on mount roles
        client
            .service('roles')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleRolesId
                }
            })
            .then((res) => {
                setRoleId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Roles',
                    type: 'error',
                    message: error.message || 'Failed get roles'
                });
            });
    }, []);

    useEffect(() => {
        // on mount positions
        client
            .service('positions')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singlePositionsId
                }
            })
            .then((res) => {
                setPositionId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Positions',
                    type: 'error',
                    message: error.message || 'Failed get positions'
                });
            });
    }, []);

    useEffect(() => {
        // on mount employees
        client
            .service('employees')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleEmployeesId
                }
            })
            .then((res) => {
                setEmployeeId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Employees',
                    type: 'error',
                    message: error.message || 'Failed get employees'
                });
            });
    }, []);

    useEffect(() => {
        // on mount users
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
    const roleIdOptions = roleId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const positionIdOptions = positionId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const employeeIdOptions = employeeId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const userIdOptions = userId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Service Permissions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="permissionServices-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="service">Service:</label>
                        <InputText id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} onChange={(e) => setValByKey('service', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['service']) ? (
                            <p className="m-0" key="error-service">
                                {error['service']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="create">Create:</label>
                        <Checkbox id="create" className="ml-3" checked={_entity?.create} onChange={(e) => setValByKey('create', e.checked)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['create']) ? (
                            <p className="m-0" key="error-create">
                                {error['create']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="read">Read:</label>
                        <InputText id="read" className="w-full mb-3 p-inputtext-sm" value={_entity?.read} onChange={(e) => setValByKey('read', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['read']) ? (
                            <p className="m-0" key="error-read">
                                {error['read']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="update">Update:</label>
                        <InputText id="update" className="w-full mb-3 p-inputtext-sm" value={_entity?.update} onChange={(e) => setValByKey('update', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['update']) ? (
                            <p className="m-0" key="error-update">
                                {error['update']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="delete">Delete:</label>
                        <InputText id="delete" className="w-full mb-3 p-inputtext-sm" value={_entity?.delete} onChange={(e) => setValByKey('delete', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['delete']) ? (
                            <p className="m-0" key="error-delete">
                                {error['delete']}
                            </p>
                        ) : null}
                    </small>
                </div>
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
                        <label htmlFor="roleId">RoleId:</label>
                        <Dropdown id="roleId" value={_entity?.roleId?._id} optionLabel="name" optionValue="value" options={roleIdOptions} onChange={(e) => setValByKey('roleId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['roleId']) ? (
                            <p className="m-0" key="error-roleId">
                                {error['roleId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="positionId">PositionId:</label>
                        <Dropdown id="positionId" value={_entity?.positionId?._id} optionLabel="name" optionValue="value" options={positionIdOptions} onChange={(e) => setValByKey('positionId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['positionId']) ? (
                            <p className="m-0" key="error-positionId">
                                {error['positionId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="employeeId">EmployeeId:</label>
                        <Dropdown id="employeeId" value={_entity?.employeeId?._id} optionLabel="name" optionValue="value" options={employeeIdOptions} onChange={(e) => setValByKey('employeeId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['employeeId']) ? (
                            <p className="m-0" key="error-employeeId">
                                {error['employeeId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="userId">UserId:</label>
                        <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey('userId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['userId']) ? (
                            <p className="m-0" key="error-userId">
                                {error['userId']}
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

export default connect(mapState, mapDispatch)(PermissionServicesCreateDialogComponent);
