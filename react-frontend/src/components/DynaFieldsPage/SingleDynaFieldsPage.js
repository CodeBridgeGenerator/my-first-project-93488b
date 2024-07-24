import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

const SingleDynaFieldsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [dynaLoader, setDynaLoader] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('dynaFields')
            .get(urlParams.singleDynaFieldsId, {
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
                        'dynaLoader'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const dynaLoader = Array.isArray(res.dynaLoader) ? res.dynaLoader.map((elem) => ({ _id: elem._id, name: elem.name })) : res.dynaLoader ? [{ _id: res.dynaLoader._id, name: res.dynaLoader.name }] : [];
                setDynaLoader(dynaLoader);
            })
            .catch((error) => {
                props.alert({
                    title: 'DynaFields',
                    type: 'error',
                    message: error.message || 'Failed get dynaFields'
                });
            });
    }, [props, urlParams.singleDynaFieldsId]);

    const goBack = () => {
        navigate('/dynaFields');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Dyna Fields</h3>
                    </div>
                    <p>dynaFields/{urlParams.singleDynaFieldsId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Field</label>
                            <p className="m-0 ml-3">{_entity?.from}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Field Type</label>
                            <p className="m-0 ml-3">{_entity?.fromType}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Field</label>
                            <p className="m-0 ml-3">{_entity?.to2}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Field Type</label>
                            <p className="m-0 ml-3">{_entity?.toType}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Ref Service</label>
                            <p className="m-0 ml-3">{_entity?.fromRefService}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Ref Service</label>
                            <p className="m-0 ml-3">{_entity?.toRefService}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Field Identity</label>
                            <p className="m-0 ml-3">{_entity?.fromIdentityFieldName}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Field Identity</label>
                            <p className="m-0 ml-3">{_entity?.toIdentityFieldName}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">From Field Relationship</label>
                            <p className="m-0 ml-3">{_entity?.fromRelationship}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">To Field Relationship</label>
                            <p className="m-0 ml-3">{_entity?.toRelationship}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Duplicates</label>
                            <p className="m-0 ml-3">{_entity?.duplicates}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">DynaLoader</label>

                            {dynaLoader.map((elem) => (
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

export default connect(mapState, mapDispatch)(SingleDynaFieldsPage);
