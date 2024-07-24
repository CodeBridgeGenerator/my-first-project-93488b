import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PromptsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatAiId, setChataiid] = useState([]);
    const [configid, setConfigid] = useState([]);

    const refDocsArray = [];
    const refDocsOptions = refDocsArray.map((x) => ({ name: x, value: x }));

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
        //on mount chatai
        client
            .service('chatai')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                setChataiid(res.data.map((e) => ({ name: e['name'], value: e._id })));
            })
            .catch((error) => {
                props.alert({
                    title: 'Chatai',
                    type: 'error',
                    message: error.message || 'Failed get chatai'
                });
            });
    }, []);
    useEffect(() => {
        //on mount config
        client
            .service('config')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                setConfigid(res.data.map((e) => ({ name: e['name'], value: e._id })));
            })
            .catch((error) => {
                props.alert({
                    title: 'Config',
                    type: 'error',
                    message: error.message || 'Failed get config'
                });
            });
    }, []);

    const onSave = async () => {
        let _data = {
            sessionid: _entity.sessionid,
            chatAiId: _entity.chatAiId,
            configid: _entity.configid,
            prompt: _entity.prompt,
            refDocs: _entity.refDocs,
            error: _entity.error
        };

        setLoading(true);
        try {
            await client.service('prompts').patch(_entity._id, _data);
            const eagerResult = await client.service('prompts').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
                    $populate: [
                        {
                            path: 'chatAiId',
                            service: 'chatai',
                            select: ['name']
                        },
                        {
                            path: 'configid',
                            service: 'config',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Edit info',
                message: 'Info prompts updated successfully'
            });
            props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to update info');
            props.alert({
                type: 'error',
                title: 'Edit info',
                message: 'Failed to update info'
            });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError('');
    };
    // children dropdown options

    const chataiidOptions = chatAiId
        .map((elem) => ({
            name: elem.name,
            value: elem.value
        }))
        .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
                numeric: true,
                sensitivity: 'base'
            })
        );
    const configidOptions = configid
        .map((elem) => ({
            name: elem.name,
            value: elem.value
        }))
        .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
                numeric: true,
                sensitivity: 'base'
            })
        );

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="prompts-edit-dialog-component">
                <div>
                    <p className="m-0">Sessionid:</p>
                    <InputText className="w-full mb-3" value={_entity?.sessionid} onChange={(e) => setValByKey('sessionid', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">ChatAi:</p>
                    <Dropdown value={_entity?.chatAiId?._id} options={chataiidOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey('chatAiId', e.value)} />
                </div>
                <div>
                    <p className="m-0">Config:</p>
                    <Dropdown value={_entity?.configid?._id} options={configidOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey('configid', e.value)} />
                </div>
                <div>
                    <p className="m-0">Prompt:</p>
                    <InputText className="w-full mb-3" value={_entity?.prompt} onChange={(e) => setValByKey('prompt', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Docs:</p>
                    <Dropdown value={_entity?.refDocs} options={refDocsOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey('refDocs', e.value)} />
                </div>
                <div>
                    <p className="m-0">Error:</p>
                    <InputText className="w-full mb-3" value={_entity?.error} onChange={(e) => setValByKey('error', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">createdAt:{' ' + moment(_entity?.createdAt).fromNow()}</p>
                </div>
                <div>
                    <p className="m-0">lastUpdatedAt:{' ' + moment(_entity?.updatedAt).fromNow()}</p>
                </div>
                <div>
                    <p className="m-0">createdBy:{' ' + _entity?.createdBy?.name}</p>
                </div>
                <div>
                    <p className="m-0">lastUpdatedBy:{' ' + _entity?.updatedBy?.name}</p>
                </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(PromptsCreateDialogComponent);
