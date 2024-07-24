import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import ProfilesPage from '../ProfilesPage/ProfilesPage';

const SinglePositionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [roleId, setRoleId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('positions')
            .get(urlParams.singlePositionsId, {
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
                        'roleId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const roleId = Array.isArray(res.roleId) ? res.roleId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.roleId ? [{ _id: res.roleId._id, name: res.roleId.name }] : [];
                setRoleId(roleId);
            })
            .catch((error) => {
                props.alert({
                    title: 'Positions',
                    type: 'error',
                    message: error.message || 'Failed get positions'
                });
            });
    }, [props, urlParams.singlePositionsId]);

    const goBack = () => {
        navigate('/positions');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Positions</h3>
                    </div>
                    <p>positions/{urlParams.singlePositionsId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Name</label>
                            <p className="m-0 ml-3">{_entity?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Description</label>
                            <p className="m-0 ml-3">{_entity?.description}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Abbr</label>
                            <p className="m-0 ml-3">{_entity?.abbr}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Is default</label>
                            <p className="m-0 ml-3">
                                <i id="isDefault" className={`pi ${_entity?.isDefault ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Role</label>

                            {roleId.map((elem) => (
                                <Link key={elem._id} to={`/roles/${elem._id}`}>
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
            <ProfilesPage />
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

export default connect(mapState, mapDispatch)(SinglePositionsPage);
