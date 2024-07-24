import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

const SingleJobQuesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [dynaLoaderId, setDynaLoaderId] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('jobQues')
            .get(urlParams.singleJobQuesId, {
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
                        'dynaLoaderId'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const dynaLoaderId = Array.isArray(res.dynaLoaderId) ? res.dynaLoaderId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.dynaLoaderId ? [{ _id: res.dynaLoaderId._id, name: res.dynaLoaderId.name }] : [];
                setDynaLoaderId(dynaLoaderId);
            })
            .catch((error) => {
                props.alert({
                    title: 'JobQues',
                    type: 'error',
                    message: error.message || 'Failed get jobQues'
                });
            });
    }, [props, urlParams.singleJobQuesId]);

    const goBack = () => {
        navigate('/jobQues');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Job Ques</h3>
                    </div>
                    <p>jobQues/{urlParams.singleJobQuesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Name</label>
                            <p className="m-0 ml-3">{_entity?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Type</label>
                            <p className="m-0 ml-3">{_entity?.type}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Service</label>
                            <p className="m-0 ml-3">{_entity?.fromService}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Service</label>
                            <p className="m-0 ml-3">{_entity?.toService}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Job Id</label>
                            <p className="m-0 ml-3">{_entity?.jobId}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Status</label>
                            <p className="m-0 ml-3">{_entity?.status}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Email</label>
                            <p className="m-0 ml-3">{_entity?.email}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">DynaLoader Id</label>
                            {dynaLoaderId.map((elem) => (
                                <Link key={elem._id} to={`/dynaLoader/${elem._id}`}>
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

export default connect(mapState, mapDispatch)(SingleJobQuesPage);
