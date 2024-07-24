import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

const SinglePermissionFieldsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [servicePermissionId, setServicePermissionId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('permissionFields')
            .get(urlParams.singlePermissionFieldsId, {
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
                        'servicePermissionId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const servicePermissionId = Array.isArray(res.servicePermissionId)
                    ? res.servicePermissionId.map((elem) => ({
                          _id: elem._id,
                          service: elem.service
                      }))
                    : res.servicePermissionId
                      ? [
                            {
                                _id: res.servicePermissionId._id,
                                service: res.servicePermissionId.service
                            }
                        ]
                      : [];
                setServicePermissionId(servicePermissionId);
            })
            .catch((error) => {
                props.alert({
                    title: 'PermissionFields',
                    type: 'error',
                    message: error.message || 'Failed get permissionFields'
                });
            });
    }, [props, urlParams.singlePermissionFieldsId]);

    const goBack = () => {
        navigate('/permissionFields');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Field Permissions</h3>
                    </div>
                    <p>permissionFields/{urlParams.singlePermissionFieldsId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Field Name</label>
                            <p className="m-0 ml-3">{_entity?.fieldName}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">OnCreate</label>
                            <p className="m-0 ml-3">
                                <i id="onCreate" className={`pi ${_entity?.onCreate ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">OnUpdate</label>
                            <p className="m-0 ml-3">
                                <i id="onUpdate" className={`pi ${_entity?.onUpdate ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">OnDetail</label>
                            <p className="m-0 ml-3">
                                <i id="onDetail" className={`pi ${_entity?.onDetail ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">OnTable</label>
                            <p className="m-0 ml-3">
                                <i id="onTable" className={`pi ${_entity?.onTable ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">ServicePermissionId</label>
                            {servicePermissionId.map((elem) => (
                                <Link key={elem._id} to={`/permissionServices/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.service}</p>
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

export default connect(mapState, mapDispatch)(SinglePermissionFieldsPage);
