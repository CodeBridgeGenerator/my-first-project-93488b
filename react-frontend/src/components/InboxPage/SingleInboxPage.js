import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import { Calendar } from 'primereact/calendar';

const SingleInboxPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [from, setFrom] = useState([]);
    const [toUser, setToUser] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('inbox')
            .get(urlParams.singleInboxId, {
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
                        'from',
                        'toUser'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const from = Array.isArray(res.from) ? res.from.map((elem) => ({ _id: elem._id, name: elem.name })) : res.from ? [{ _id: res.from._id, name: res.from.name }] : [];
                setFrom(from);
                const toUser = Array.isArray(res.toUser) ? res.toUser.map((elem) => ({ _id: elem._id, name: elem.name })) : res.toUser ? [{ _id: res.toUser._id, name: res.toUser.name }] : [];
                setToUser(toUser);
            })
            .catch((error) => {
                props.alert({
                    title: 'Inbox',
                    type: 'error',
                    message: error.message || 'Failed get inbox'
                });
            });
    }, [props, urlParams.singleInboxId]);

    const goBack = () => {
        navigate('/inbox');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Inbox</h3>
                    </div>
                    <p>inbox/{urlParams.singleInboxId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Content</label>
                            <p className="m-0 ml-3">{_entity?.content}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Read</label>
                            <p className="m-0 ml-3">
                                <i id="read" className={`pi ${_entity?.read ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Sent</label>
                            <p className="m-0 ml-3">
                                <Calendar id="sent" value={new Date(_entity?.sent)} disabled={true} hourFormat="24" />
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">From</label>
                            {from.map((elem) => (
                                <Link key={elem._id} to={`/users/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">ToUser</label>
                            {toUser.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleInboxPage);
