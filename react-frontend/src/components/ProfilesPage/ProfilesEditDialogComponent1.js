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
import { Checkbox } from 'primereact/checkbox';
import { Chips } from 'primereact/chips';

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

const ProfilesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([]);
    const [department, setDepartment] = useState([]);
    const [section, setSection] = useState([]);
    const [position, setPosition] = useState([]);
    const [manager, setManager] = useState([]);
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState([]);

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
    useEffect(() => {
        //on mount departments
        client
            .service('departments')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleDepartmentsId
                }
            })
            .then((res) => {
                setDepartment(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Departments',
                    type: 'error',
                    message: error.message || 'Failed get departments'
                });
            });
    }, []);
    useEffect(() => {
        //on mount sections
        client
            .service('sections')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleSectionsId
                }
            })
            .then((res) => {
                setSection(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Sections',
                    type: 'error',
                    message: error.message || 'Failed get sections'
                });
            });
    }, []);
    useEffect(() => {
        //on mount positions
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
                setPosition(
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
        //on mount companies
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
                setCompany(
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
    useEffect(() => {
        //on mount branches
        client
            .service('branches')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleBranchesId
                }
            })
            .then((res) => {
                setBranch(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Branches',
                    type: 'error',
                    message: error.message || 'Failed get branches'
                });
            });
    }, []);
    useEffect(() => {
        //on mount userAddresses
        client
            .service('userAddresses')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleUserAddressesId
                }
            })
            .then((res) => {
                setAddress(
                    res.data.map((e) => {
                        return { name: e['Street1'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'UserAddresses',
                    type: 'error',
                    message: error.message || 'Failed get userAddresses'
                });
            });
    }, []);
    useEffect(() => {
        //on mount userPhones
        client
            .service('userPhones')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleUserPhonesId
                }
            })
            .then((res) => {
                setPhone(
                    res.data.map((e) => {
                        return { name: e['number'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'UserPhones',
                    type: 'error',
                    message: error.message || 'Failed get userPhones'
                });
            });
    }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
            userId: _entity?.userId?._id,
            image: _entity?.image,
            bio: _entity?.bio,
            department: _entity?.department?._id,
            hod: _entity?.hod,
            section: _entity?.section?._id,
            hos: _entity?.hos,
            position: _entity?.position?._id,
            manager: _entity?.manager?._id,
            company: _entity?.company?._id,
            branch: _entity?.branch?._id,
            skills: _entity?.skills,
            address: _entity?.address?._id,
            phone: _entity?.phone?._id
        };

        setLoading(true);
        try {
            await client.service('profiles').patch(_entity._id, _data);
            const eagerResult = await client.service('profiles').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
                    $populate: [
                        {
                            path: 'userId',
                            service: 'users',
                            select: ['name']
                        },
                        {
                            path: 'department',
                            service: 'departments',
                            select: ['name']
                        },
                        {
                            path: 'section',
                            service: 'sections',
                            select: ['name']
                        },
                        {
                            path: 'position',
                            service: 'positions',
                            select: ['name']
                        },
                        {
                            path: 'company',
                            service: 'companies',
                            select: ['name']
                        },
                        {
                            path: 'branch',
                            service: 'branches',
                            select: ['name']
                        },
                        {
                            path: 'address',
                            service: 'userAddresses',
                            select: ['Street1']
                        },
                        {
                            path: 'phone',
                            service: 'userPhones',
                            select: ['number']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Edit info',
                message: 'Info profiles updated successfully'
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
        if (new_entity?.position?._id && new_entity?.userId?._id) {
            const p = position.find((p) => p.value === new_entity?.position?._id);
            const n = userId.find((p) => p.value === new_entity?.userId?._id);
            const name = `${n.name} (${p.name})`;
            new_entity = { ...new_entity, name };
        }
        set_entity(new_entity);
        setError({});
    };

    const userIdOptions = userId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const departmentOptions = department.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const sectionOptions = section.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const positionOptions = position.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const managerOptions = manager.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const companyOptions = company.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const branchOptions = branch.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const addressOptions = address.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));
    const phoneOptions = phone.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Edit Profiles" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="profiles-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="name">Name:</label>
                        <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey('name', e.target.value)} required disabled={true} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="userId">User:</label>
                        <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey('userId', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="image">Image:</label>
                        <InputText className="w-full mb-3 p-inputtext-sm" value={_entity?.image} onChange={(e) => setValByKey('image', e.target.value)} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="bio">Bio:</label>
                        <InputTextarea id="bio" rows={5} cols={30} value={_entity?.bio} onChange={(e) => setValByKey('bio', e.target.value)} autoResize />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="department">Department:</label>
                        <Dropdown id="department" value={_entity?.department?._id} optionLabel="name" optionValue="value" options={departmentOptions} onChange={(e) => setValByKey('department', { _id: e.value })} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="hod">Head of Department:</label>
                        <Checkbox id="hod" className="ml-3" checked={_entity?.hod} onChange={(e) => setValByKey('hod', e.checked)} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="section">Section:</label>
                        <Dropdown id="section" value={_entity?.section?._id} optionLabel="name" optionValue="value" options={sectionOptions} onChange={(e) => setValByKey('section', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="hos">Head of Section:</label>
                        <Checkbox id="hos" className="ml-3" checked={_entity?.hos} onChange={(e) => setValByKey('hos', e.checked)} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="position">Position:</label>
                        <Dropdown id="position" value={_entity?.position?._id} optionLabel="name" optionValue="value" options={positionOptions} onChange={(e) => setValByKey('position', { _id: e.value })} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="manager">Manager:</label>
                        <Dropdown id="manager" value={_entity?.manager?._id} optionLabel="name" optionValue="value" options={managerOptions} onChange={(e) => setValByKey('manager', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="company">Company:</label>
                        <Dropdown id="company" value={_entity?.company?._id} optionLabel="name" optionValue="value" options={companyOptions} onChange={(e) => setValByKey('company', { _id: e.value })} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="branch">Branch:</label>
                        <Dropdown id="branch" value={_entity?.branch?._id} optionLabel="name" optionValue="value" options={branchOptions} onChange={(e) => setValByKey('branch', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="skills">Skills:</label>
                        <Chips id="skills" className="w-full mb-3" value={_entity?.skills} onChange={(e) => setValByKey('skills', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="address">Address:</label>
                        <Dropdown id="address" value={_entity?.address?._id} optionLabel="name" optionValue="value" options={addressOptions} onChange={(e) => setValByKey('address', { _id: e.value })} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="phone">Phone:</label>
                        <Dropdown id="phone" value={_entity?.phone?._id} optionLabel="name" optionValue="value" options={phoneOptions} onChange={(e) => setValByKey('phone', { _id: e.value })} />
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

export default connect(mapState, mapDispatch)(ProfilesCreateDialogComponent);
