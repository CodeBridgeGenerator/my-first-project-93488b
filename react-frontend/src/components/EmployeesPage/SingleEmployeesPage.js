import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import DepartmentAdminPage from '../DepartmentAdminPage/DepartmentAdminPage';
import DepartmentHODPage from '../DepartmentHODPage/DepartmentHODPage';
import DepartmentHOSPage from '../DepartmentHOSPage/DepartmentHOSPage';
import PermissionServicesPage from '../PermissionServicesPage/PermissionServicesPage';

const SingleEmployeesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [company, setCompany] = useState([]);
    const [department, setDepartment] = useState([]);
    const [section, setSection] = useState([]);
    const [position, setPosition] = useState([]);
    const [supervisor, setSupervisor] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('employees')
            .get(urlParams.singleEmployeesId, {
                query: {
                    $populate: [
                        {
                            path: 'createdBy',
                            service: 'users',
                            select: ['name']
                        },
                        {
                            path: 'updatedBy',
                            service: 'users',
                            select: ['name']
                        },
                        'company',
                        'department',
                        'section',
                        'position',
                        'supervisor'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const company = Array.isArray(res.company) ? res.company.map((elem) => ({ _id: elem._id, name: elem.name })) : res.company ? [{ _id: res.company._id, name: res.company.name }] : [];
                setCompany(company);
                const department = Array.isArray(res.department) ? res.department.map((elem) => ({ _id: elem._id, name: elem.name })) : res.department ? [{ _id: res.department._id, name: res.department.name }] : [];
                setDepartment(department);
                const section = Array.isArray(res.section) ? res.section.map((elem) => ({ _id: elem._id, name: elem.name })) : res.section ? [{ _id: res.section._id, name: res.section.name }] : [];
                setSection(section);
                const position = Array.isArray(res.position) ? res.position.map((elem) => ({ _id: elem._id, name: elem.name })) : res.position ? [{ _id: res.position._id, name: res.position.name }] : [];
                setPosition(position);
                const supervisor = Array.isArray(res.supervisor) ? res.supervisor.map((elem) => ({ _id: elem._id, name: elem.name })) : res.supervisor ? [{ _id: res.supervisor._id, name: res.supervisor.name }] : [];
                setSupervisor(supervisor);
            })
            .catch((error) => {
                props.alert({
                    title: 'Employees',
                    type: 'error',
                    message: error.message || 'Failed get employees'
                });
            });
    }, [props, urlParams.singleEmployeesId]);

    const goBack = () => {
        navigate('/employees');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Employees</h3>
                    </div>
                    <p>employees/{urlParams.singleEmployeesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Emp No</label>
                            <p className="m-0 ml-3">{_entity?.empNo}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Name</label>
                            <p className="m-0 ml-3">{_entity?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Fullname</label>
                            <p className="m-0 ml-3">{_entity?.fullname}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">User Email</label>
                            <p className="m-0 ml-3">{_entity?.userEmail}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Date Joined</label>
                            <p id="dateJoined" className="m-0 ml-3">
                                {_entity?.dateJoined}
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Date Terminated</label>
                            <p id="dateTerminated" className="m-0 ml-3">
                                {_entity?.dateTerminated}
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Resigned</label>
                            <p className="m-0 ml-3">{_entity?.resigned}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Emp Group</label>
                            <p className="m-0 ml-3">{_entity?.empGroup}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Emp Code</label>
                            <p className="m-0 ml-3">{_entity?.empCode}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Company</label>
                            {company.map((elem) => (
                                <Link key={elem._id} to={`/companies/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Department</label>
                            {department.map((elem) => (
                                <Link key={elem._id} to={`/departments/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Section</label>
                            {section.map((elem) => (
                                <Link key={elem._id} to={`/sections/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Position</label>
                            {position.map((elem) => (
                                <Link key={elem._id} to={`/positions/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Supervisor</label>
                            {supervisor.map((elem) => (
                                <Link key={elem._id} to={`/employees/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="col-12">&nbsp;</div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="created By:"></Tag>
                            <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="created At:"></Tag>
                            <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="last Updated By:"></Tag>
                            <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="updated At:"></Tag>
                            <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <DepartmentAdminPage />
            <DepartmentHODPage />
            <DepartmentHOSPage />
            <PermissionServicesPage />
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(SingleEmployeesPage);
