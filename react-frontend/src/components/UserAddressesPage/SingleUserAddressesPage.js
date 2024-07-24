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

const SingleUserAddressesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [userId, setUserId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('userAddresses')
            .get(urlParams.singleUserAddressesId, {
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
                        'userId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const userId = Array.isArray(res.userId) ? res.userId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.userId ? [{ _id: res.userId._id, name: res.userId.name }] : [];
                setUserId(userId);
            })
            .catch((error) => {
                props.alert({
                    title: 'UserAddresses',
                    type: 'error',
                    message: error.message || 'Failed get userAddresses'
                });
            });
    }, [props, urlParams.singleUserAddressesId]);

    const goBack = () => {
        navigate('/userAddresses');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">User Addresses</h3>
                    </div>
                    <p>userAddresses/{urlParams.singleUserAddressesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Street1</label>
                            <p className="m-0 ml-3">{_entity?.Street1}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Street2</label>
                            <p className="m-0 ml-3">{_entity?.Street2}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Poscode</label>
                            <p className="m-0 ml-3">{_entity?.Poscode}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">City</label>
                            <p className="m-0 ml-3">{_entity?.City}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">State</label>
                            <p className="m-0 ml-3">{_entity?.State}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Province</label>
                            <p className="m-0 ml-3">{_entity?.Province}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Country</label>
                            <p className="m-0 ml-3">{_entity?.Country}</p>
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

export default connect(mapState, mapDispatch)(SingleUserAddressesPage);
