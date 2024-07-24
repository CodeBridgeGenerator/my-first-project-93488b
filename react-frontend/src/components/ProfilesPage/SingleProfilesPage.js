import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import PermissionServicesPage from '../PermissionServicesPage/PermissionServicesPage';
import PermissionFieldsPage from '../PermissionFieldsPage/PermissionFieldsPage';
import { Chip } from 'primereact/chip';

const SingleProfilesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

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
        //on mount
        client
            .service('profiles')
            .get(urlParams.singleProfilesId, {
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
                        'userId',
                        'department',
                        'section',
                        'position',
                        'manager',
                        'company',
                        'branch',
                        'address',
                        'phone'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId) ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.userId ? [{ _id: res.userId._id, name: res.userId.name }] : [];
                setUserId(userId);
                const department = Array.isArray(res.department) ? res.department.map((elem) => ({ _id: elem._id, name: elem.name })) : res.department ? [{ _id: res.department._id, name: res.department.name }] : [];
                setDepartment(department);
                const section = Array.isArray(res.section) ? res.section.map((elem) => ({ _id: elem._id, name: elem.name })) : res.section ? [{ _id: res.section._id, name: res.section.name }] : [];
                setSection(section);
                const position = Array.isArray(res.position) ? res.position.map((elem) => ({ _id: elem._id, name: elem.name })) : res.position ? [{ _id: res.position._id, name: res.position.name }] : [];
                setPosition(position);
                const manager = Array.isArray(res.manager) ? res.manager.map((elem) => ({ _id: elem._id, name: elem.name })) : res.manager ? [{ _id: res.manager._id, name: res.manager.name }] : [];
                setManager(manager);
                const company = Array.isArray(res.company) ? res.company.map((elem) => ({ _id: elem._id, name: elem.name })) : res.company ? [{ _id: res.company._id, name: res.company.name }] : [];
                setCompany(company);
                const branch = Array.isArray(res.branch) ? res.branch.map((elem) => ({ _id: elem._id, name: elem.name })) : res.branch ? [{ _id: res.branch._id, name: res.branch.name }] : [];
                setBranch(branch);
                const address = Array.isArray(res.address)
                    ? res.address.map((elem) => ({
                          _id: elem._id,
                          Street1: elem.Street1
                      }))
                    : res.address
                      ? [{ _id: res.address._id, Street1: res.address.Street1 }]
                      : [];
                setAddress(address);
                const phone = Array.isArray(res.phone) ? res.phone.map((elem) => ({ _id: elem._id, number: elem.number })) : res.phone ? [{ _id: res.phone._id, number: res.phone.number }] : [];
                setPhone(phone);
            })
            .catch((error) => {
                props.alert({
                    title: 'Profiles',
                    type: 'error',
                    message: error.message || 'Failed get profiles'
                });
            });
    }, [props, urlParams.singleProfilesId]);

    const goBack = () => {
        navigate('/profiles');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Profiles</h3>
                    </div>
                    <p>profiles/{urlParams.singleProfilesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Name</label>
                            <p className="m-0 ml-3">{_entity?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Image</label>
                            <p>
                                <img id="image" src={_entity?.image} className="m-0 ml-3" width={300} />
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Bio</label>
                            <p className="m-0 ml-3">{_entity?.bio}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Head of Department</label>
                            <p className="m-0 ml-3">
                                <i id="hod" className={`pi ${_entity?.hod ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Head of Section</label>
                            <p className="m-0 ml-3">
                                <i id="hos" className={`pi ${_entity?.hos ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Skills</label>
                            <p className="m-0 ml-3">
                                <Chip id="skills" label={_entity?.skills} />
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">User</label>

                            {userId.map((elem) => (
                                <Link key={elem._id} to={`/users/${elem._id}`}>
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
                            <label className="text-sm">Manager</label>

                            {manager.map((elem) => (
                                <Link key={elem._id} to={`/users/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
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
                            <label className="text-sm">Branch</label>

                            {branch.map((elem) => (
                                <Link key={elem._id} to={`/branches/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Address</label>

                            {address.map((elem) => (
                                <Link key={elem._id} to={`/userAddresses/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.Street1}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Phone</label>

                            {phone.map((elem) => (
                                <Link key={elem._id} to={`/userPhones/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.number}</p>
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
            <PermissionServicesPage />
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

export default connect(mapState, mapDispatch)(SingleProfilesPage);
