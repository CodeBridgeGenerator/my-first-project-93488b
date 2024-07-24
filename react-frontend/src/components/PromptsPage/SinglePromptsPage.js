import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';

const SinglePromptsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [chatAiId, setChataiid] = useState([]);
    const [configid, setConfigid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('prompts')
            .get(urlParams.singlePromptsId, {
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
                        'chatAiId',
                        'configid'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const chatAiId = Array.isArray(res.chatAiId) ? res.chatAiId.map((elem) => ({ _id: elem._id, name: elem.name })) : res.chatAiId ? [{ _id: res.chatAiId._id, name: res.chatAiId.name }] : [];
                setChataiid(chatAiId);
                const configid = Array.isArray(res.configid) ? res.configid.map((elem) => ({ _id: elem._id, name: elem.name })) : res.configid ? [{ _id: res.configid._id, name: res.configid.name }] : [];
                setConfigid(configid);
            })
            .catch((error) => {
                props.alert({
                    title: 'Prompts',
                    type: 'error',
                    message: error.message || 'Failed get prompts'
                });
            });
    }, [props, urlParams.singlePromptsId]);

    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Prompts</h3>
                </div>
                <p>prompts/{urlParams.singlePromptsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
                    {/* <label className="text-sm text-primary">Sessionid</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.sessionid}</p>
          </div>
          <label className="text-sm text-primary">ChatAi</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.chatAiId?.name}</p>
          </div>
          <label className="text-sm text-primary">Config</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.configid?.name}</p>
          </div> */}
                    <label className="text-sm text-primary">Prompt</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.prompt}</p>
                    </div>
                    <label className="text-sm text-primary">Response Text</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3 scrollable" dangerouslySetInnerHTML={{ __html: _entity?.responseText }}></p>
                    </div>
                    <label className="text-sm text-primary">Remarks</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.userRemarks ? _entity?.userRemarks : 'No remarks'}</p>
                    </div>
                    <label className="text-sm text-primary">Thumbs</label>
                    <span className="ml-3">{_entity?.thumbsUp ? <i className="pi pi-thumbs-up-fill" style={{ color: 'green' }}></i> : <i className="pi pi-thumbs-down-fill" style={{ color: 'red' }}></i>}</span>
                    <label className="ml-3 text-sm text-primary">Copied</label>
                    <span className="ml-3">{_entity?.copied ? <i className="pi pi-check-square" style={{ color: 'green' }}></i> : <i className="pi pi-times-circle" style={{ color: 'red' }}></i>}</span>
                    <label className="ml-3 text-sm text-primary">Emailed</label>
                    <span className="ml-3">{_entity?.emailed ? <i className="pi pi-check-square" style={{ color: 'green' }}></i> : <i className="pi pi-times-circle" style={{ color: 'red' }}></i>}</span>
                    {/* <label className="text-sm text-primary">System Id</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.systemId}</p>
          </div> */}
                    {/* <label className="text-sm text-primary">Type</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.type}</p>
          </div>
          <label className="text-sm text-primary">Role</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.role}</p>
          </div>
          <label className="text-sm text-primary">Model</label>
          <div className="ml-3">
            <p className="m-0 ml-3">{_entity?.model}</p>
          </div> */}
                    <div className="ml-3">
                        <p className="m-0 ml-3"></p>
                    </div>
                    <label className="text-sm text-primary">Stop Reason</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.stopReason}</p>
                    </div>
                    <label className="text-sm text-primary">Stop Sequence</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.stopSequence}</p>
                    </div>
                    <label className="text-sm text-primary">inputTokens</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.inputTokens}</p>
                    </div>
                    <label className="text-sm text-primary">outputTokens</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.outputTokens}</p>
                    </div>
                    <label className="text-sm text-primary">cost</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.cost.toFixed(2)}</p>
                    </div>
                    <label className="text-sm text-primary">status</label>
                    <div className="ml-3">
                        <i className={`m-0 ml-3 pi ${_entity?.status ? 'pi-check' : 'pi-times'}`}></i>
                    </div>
                    <label className="text-sm text-primary">Error</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.error ? _entity?.error : 'No errors found'}</p>
                    </div>
                    {/* <label className="text-sm">ChatAi</label>
          <p>
            {chatAiId.map((elem) => (
              <Link key={elem._id} to={`/chatai/${elem._id}`}>
                <div className="card">
                  <p>{elem.name}</p>
                </div>
              </Link>
            ))}
          </p> */}
                    {/* <label className="text-sm">Config</label>
          <p>
            {configid.map((elem) => (
              <Link key={elem._id} to={`/config/${elem._id}`}>
                <div className="card">
                  <p>{elem.name}</p>
                </div>
              </Link>
            ))}
          </p> */}
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">createdBy</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <label className="text-sm text-primary">lastUpdatedBy</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
    //
});

export default connect(mapState, mapDispatch)(SinglePromptsPage);
