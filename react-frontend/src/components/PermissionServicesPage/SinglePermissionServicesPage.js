import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import PermissionFieldsPage from '../PermissionFieldsPage/PermissionFieldsPage';

const SinglePermissionServicesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [profile, setProfile] = useState([]);
    const [roleId, setRoleId] = useState([]);
    const [positionId, setPositionId] = useState([]);
    const [employeeId, setEmployeeId] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('permissionServices')
            .get(urlParams.singlePermissionServicesId, {
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
                        'profile',
                        'roleId',
                        'positionId',
                        'employeeId',
                        'userId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const profile = Array.isArray(res.profile) ? res.profile.map((elem) => ({ _id: elem._id, name: elem.name })) : res.profile ? [{ _id: res.profile._id, name: res.profile.name }] : [];
                setProfile(profile);
                const roleId = Array.isArray(res.roleId) ? res.roleId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.roleId ? [{ _id: res.roleId._id, name: res.roleId.name }] : [];
                setRoleId(roleId);
                const positionId = Array.isArray(res.positionId) ? res.positionId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.positionId ? [{ _id: res.positionId._id, name: res.positionId.name }] : [];
                setPositionId(positionId);
                const employeeId = Array.isArray(res.employeeId) ? res.employeeId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.employeeId ? [{ _id: res.employeeId._id, name: res.employeeId.name }] : [];
                setEmployeeId(employeeId);
                const userId = Array.isArray(res.userId) ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.userId ? [{ _id: res.userId._id, name: res.userId.name }] : [];
                setUserId(userId);
            })
            .catch((error) => {
                props.alert({
                    title: 'PermissionServices',
                    type: 'error',
                    message: error.message || 'Failed get permissionServices'
                });
            });
    }, [props, urlParams.singlePermissionServicesId]);

    const goBack = () => {
        navigate('/permissionServices');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Service Permissions</h3>
                    </div>
                    <p>permissionServices/{urlParams.singlePermissionServicesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Service</label>
                            <p className="m-0 ml-3">{_entity?.service}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Create</label>
                            <p className="m-0 ml-3">
                                <i id="create" className={`pi ${_entity?.create ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Read</label>
                            <p className="m-0 ml-3">{_entity?.read}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Update</label>
                            <p className="m-0 ml-3">{_entity?.update}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Delete</label>
                            <p className="m-0 ml-3">{_entity?.delete}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Profile</label>
                            {profile.map((elem) => (
                                <Link key={elem._id} to={`/profiles/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">RoleId</label>
                            {roleId.map((elem) => (
                                <Link key={elem._id} to={`/roles/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">PositionId</label>
                            {positionId.map((elem) => (
                                <Link key={elem._id} to={`/positions/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">EmployeeId</label>
                            {employeeId.map((elem) => (
                                <Link key={elem._id} to={`/employees/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">UserId</label>
                            {userId.map((elem) => (
                                <Link key={elem._id} to={`/users/${elem._id}`}>
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
            <PermissionFieldsPage />
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

export default connect(mapState, mapDispatch)(SinglePermissionServicesPage);
