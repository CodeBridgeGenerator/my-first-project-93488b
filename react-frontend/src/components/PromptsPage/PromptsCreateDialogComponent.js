import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Checkbox } from 'primereact/checkbox';

const refDocsArray = [];
const refDocsOptions = refDocsArray.map((x) => ({ name: x, value: x }));

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

    useEffect(() => {
        // replace this when there is a date field
        // let init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            sessionid: _entity.sessionid,
            chatAiId: _entity.chatAiId?._id,
            configid: _entity.configid?._id,
            prompt: _entity.prompt,
            refDocs: _entity.refDocs,
            responseText: _entity.responseText,
            systemId: _entity.systemId,
            type: _entity.type,
            role: _entity.role,
            model: _entity.model,
            stopReason: _entity.stopReason,
            stopSequence: _entity.stopSequence,
            inputTokens: _entity.inputTokens,
            outputTokens: _entity.outputTokens,
            cost: _entity.cost,
            status: _entity.status,
            error: _entity.error,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('prompts').create(_data);
            const eagerResult = await client.service('prompts').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
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
                title: 'Create info',
                message: 'Info prompts updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        //on mount chatai
        client
            .service('chatai')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                setChataiid(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
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
                setConfigid(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'Config',
                    type: 'error',
                    message: error.message || 'Failed get config'
                });
            });
    }, []);

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
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="prompts-create-dialog-component">
                <div>
                    <p className="m-0">Sessionid:</p>
                    <InputText className="w-full mb-3" value={_entity?.sessionid} onChange={(e) => setValByKey('sessionid', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">ChatAi:</p>
                    <Dropdown value={_entity?.chatAiId} optionLabel="name" optionValue="value" options={chataiidOptions} onChange={(e) => setValByKey('chatAiId', { _id: e.value })} />
                </div>
                <div>
                    <p className="m-0">Config:</p>
                    <Dropdown value={_entity?.configid} optionLabel="name" optionValue="value" options={configidOptions} onChange={(e) => setValByKey('configid', { _id: e.value })} />
                </div>
                <div>
                    <p className="m-0">Prompt:</p>
                    <InputText className="w-full mb-3" value={_entity?.prompt} onChange={(e) => setValByKey('prompt', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Docs:</p>
                    <Dropdown value={_entity?.refDocs} optionLabel="name" optionValue="value" options={refDocsOptions} onChange={(e) => setValByKey('refDocs', e.value)} />
                </div>
                <div>
                    <p className="m-0">Response Text:</p>
                    <InputText className="w-full mb-3" value={_entity?.responseText} onChange={(e) => setValByKey('responseText', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">System Id:</p>
                    <InputText className="w-full mb-3" value={_entity?.systemId} onChange={(e) => setValByKey('systemId', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Type:</p>
                    <InputText className="w-full mb-3" value={_entity?.type} onChange={(e) => setValByKey('type', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Role:</p>
                    <InputText className="w-full mb-3" value={_entity?.role} onChange={(e) => setValByKey('role', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Model:</p>
                    <InputText className="w-full mb-3" value={_entity?.model} onChange={(e) => setValByKey('model', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Stop Reason:</p>
                    <InputText className="w-full mb-3" value={_entity?.stopReason} onChange={(e) => setValByKey('stopReason', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">Stop Sequence:</p>
                    <InputText className="w-full mb-3" value={_entity?.stopSequence} onChange={(e) => setValByKey('stopSequence', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">inputTokens:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.inputTokens} onChange={(e) => setValByKey('inputTokens', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">outputTokens:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.outputTokens} onChange={(e) => setValByKey('outputTokens', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">cost:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.cost} onChange={(e) => setValByKey('cost', e.target.value)} />
                </div>
                <div>
                    <p className="m-0">status:</p>
                    <Checkbox checked={_entity?.status} onChange={(e) => setValByKey('status', e.checked)}></Checkbox>
                </div>
                <div>
                    <p className="m-0">Error:</p>
                    <InputText className="w-full mb-3" value={_entity?.error} onChange={(e) => setValByKey('error', e.target.value)} />
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
