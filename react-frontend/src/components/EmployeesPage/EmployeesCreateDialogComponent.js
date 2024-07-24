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
import { Calendar } from 'primereact/calendar';

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

const EmployeesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [company, setCompany] = useState([]);
    const [department, setDepartment] = useState([]);
    const [section, setSection] = useState([]);
    const [position, setPosition] = useState([]);
    const [supervisor, setSupervisor] = useState([]);

    useEffect(() => {
        let init = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [company, department, section, position, supervisor], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.empNo)) {
            error['empNo'] = `Emp No field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.name)) {
            error['name'] = `Name field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.fullname)) {
            error['fullname'] = `Fullname field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.userEmail)) {
            error['userEmail'] = `User Email field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.resigned)) {
            error['resigned'] = `Resigned field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.empGroup)) {
            error['empGroup'] = `Emp Group field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.empCode)) {
            error['empCode'] = `Emp Code field is required`;
            ret = false;
        }
        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            empNo: _entity?.empNo,
            name: _entity?.name,
            fullname: _entity?.fullname,
            userEmail: _entity?.userEmail,
            company: _entity?.company?._id,
            department: _entity?.department?._id,
            section: _entity?.section?._id,
            position: _entity?.position?._id,
            supervisor: _entity?.supervisor?._id,
            dateJoined: _entity?.dateJoined,
            dateTerminated: _entity?.dateTerminated,
            resigned: _entity?.resigned,
            empGroup: _entity?.empGroup,
            empCode: _entity?.empCode,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('employees').create(_data);
            const eagerResult = await client.service('employees').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'company',
                            service: 'companies',
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
                            path: 'supervisor',
                            service: 'employees',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Employees updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Employees'
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
        // on mount departments
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
        // on mount sections
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
                setSupervisor(
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

    const companyOptions = company.map((elem) => ({
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
    const supervisorOptions = supervisor.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Employees" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="employees-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empNo">Emp No:</label>
                        <InputText id="empNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.empNo} onChange={(e) => setValByKey('empNo', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empNo']) ? (
                            <p className="m-0" key="error-empNo">
                                {error['empNo']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="name">Name:</label>
                        <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey('name', e.target.value)} required />
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
                        <label htmlFor="fullname">Fullname:</label>
                        <InputText id="fullname" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullname} onChange={(e) => setValByKey('fullname', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fullname']) ? (
                            <p className="m-0" key="error-fullname">
                                {error['fullname']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="userEmail">User Email:</label>
                        <InputText id="userEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.userEmail} onChange={(e) => setValByKey('userEmail', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['userEmail']) ? (
                            <p className="m-0" key="error-userEmail">
                                {error['userEmail']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="company">Company:</label>
                        <Dropdown id="company" value={_entity?.company?._id} optionLabel="name" optionValue="value" options={companyOptions} onChange={(e) => setValByKey('company', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['company']) ? (
                            <p className="m-0" key="error-company">
                                {error['company']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="department">Department:</label>
                        <Dropdown id="department" value={_entity?.department?._id} optionLabel="name" optionValue="value" options={departmentOptions} onChange={(e) => setValByKey('department', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['department']) ? (
                            <p className="m-0" key="error-department">
                                {error['department']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="section">Section:</label>
                        <Dropdown id="section" value={_entity?.section?._id} optionLabel="name" optionValue="value" options={sectionOptions} onChange={(e) => setValByKey('section', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['section']) ? (
                            <p className="m-0" key="error-section">
                                {error['section']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="position">Position:</label>
                        <Dropdown id="position" value={_entity?.position?._id} optionLabel="name" optionValue="value" options={positionOptions} onChange={(e) => setValByKey('position', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['position']) ? (
                            <p className="m-0" key="error-position">
                                {error['position']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="supervisor">Supervisor:</label>
                        <Dropdown id="supervisor" value={_entity?.supervisor?._id} optionLabel="name" optionValue="value" options={supervisorOptions} onChange={(e) => setValByKey('supervisor', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['supervisor']) ? (
                            <p className="m-0" key="error-supervisor">
                                {error['supervisor']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="dateJoined">Date Joined:</label>
                        <Calendar id="dateJoined" value={_entity?.dateJoined ? new Date(_entity?.dateJoined) : new Date()} dateFormat="dd/mm/yy" onChange={(e) => setValByKey('dateJoined', new Date(e.target.value))} showIcon showButtonBar />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['dateJoined']) ? (
                            <p className="m-0" key="error-dateJoined">
                                {error['dateJoined']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="dateTerminated">Date Terminated:</label>
                        <Calendar id="dateTerminated" value={_entity?.dateTerminated ? new Date(_entity?.dateTerminated) : new Date()} dateFormat="dd/mm/yy" onChange={(e) => setValByKey('dateTerminated', new Date(e.target.value))} showIcon showButtonBar />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['dateTerminated']) ? (
                            <p className="m-0" key="error-dateTerminated">
                                {error['dateTerminated']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="resigned">Resigned:</label>
                        <InputText id="resigned" className="w-full mb-3 p-inputtext-sm" value={_entity?.resigned} onChange={(e) => setValByKey('resigned', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['resigned']) ? (
                            <p className="m-0" key="error-resigned">
                                {error['resigned']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empGroup">Emp Group:</label>
                        <InputText id="empGroup" className="w-full mb-3 p-inputtext-sm" value={_entity?.empGroup} onChange={(e) => setValByKey('empGroup', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empGroup']) ? (
                            <p className="m-0" key="error-empGroup">
                                {error['empGroup']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empCode">Emp Code:</label>
                        <InputText id="empCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.empCode} onChange={(e) => setValByKey('empCode', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empCode']) ? (
                            <p className="m-0" key="error-empCode">
                                {error['empCode']}
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

export default connect(mapState, mapDispatch)(EmployeesCreateDialogComponent);
