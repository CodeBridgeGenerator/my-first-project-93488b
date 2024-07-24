import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

const SingleDepartmentHOSPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [sectionId, setSectionId] = useState([]);
    const [employeeId, setEmployeeId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('departmentHOS')
            .get(urlParams.singleDepartmentHOSId, {
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
                        'sectionId',
                        'employeeId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const sectionId = Array.isArray(res.sectionId) ? res.sectionId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.sectionId ? [{ _id: res.sectionId._id, name: res.sectionId.name }] : [];
                setSectionId(sectionId);
                const employeeId = Array.isArray(res.employeeId) ? res.employeeId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.employeeId ? [{ _id: res.employeeId._id, name: res.employeeId.name }] : [];
                setEmployeeId(employeeId);
            })
            .catch((error) => {
                props.alert({
                    title: 'DepartmentHOS',
                    type: 'error',
                    message: error.message || 'Failed get departmentHOS'
                });
            });
    }, [props, urlParams.singleDepartmentHOSId]);

    const goBack = () => {
        navigate('/departmentHOS');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">DepartmentHOS</h3>
                    </div>
                    <p>departmentHOS/{urlParams.singleDepartmentHOSId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">SectionId</label>
                            {sectionId.map((elem) => (
                                <Link key={elem._id} to={`/sections/${elem._id}`}>
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

export default connect(mapState, mapDispatch)(SingleDepartmentHOSPage);
