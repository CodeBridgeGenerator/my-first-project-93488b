import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const ChataiProjectActionBehaviorsPage = (props) => {
    const [maxCount, setMaxCount] = useState(0);
    const [count, setCount] = useState(0);
    const [saveAs, setSaveAs] = useState('');
    const [name, setName] = useState();
    const [human, setHuman] = useState();
    const [noCondition, setNoCondition] = useState();
    const [yesCondition, setYesCondition] = useState();
    const [task, setTask] = useState();
    const [example, setExample] = useState();
    const [preamble, setPreamble] = useState();
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        //on mount
        getUserConfig();
    }, [saveAs]);

    const onBack = () => {
        const currentCount = count - 1;
        if (currentCount <= 0) {
            setCount(0);
            setBehaviorForm(props.refUserConfig[0]);
            props.setNumConfig(0);
        } else {
            setCount(currentCount);
            setBehaviorForm(props.refUserConfig[currentCount]);
            props.setNumConfig(currentCount);
        }
    };

    const onFront = () => {
        const currentCount = count + 1;
        if (currentCount > maxCount - 1) {
            setCount(0);
            setBehaviorForm(props.refUserConfig[0]);
            props.setNumConfig(0);
        } else {
            setCount(currentCount);
            setBehaviorForm(props.refUserConfig[currentCount]);
            props.setNumConfig(currentCount);
        }
    };

    const setBehaviorForm = (config) => {
        config.name ? setName(config.name) : setName('none');
        setHuman(config?.human);
        setNoCondition(config?.noCondition);
        setYesCondition(config?.yesCondition);
        setTask(config?.task);
        setExample(config?.example);
        setPreamble(config?.preamble);
        props.setSelectedConfigId(config._id);
    };

    const getBehaviorForm = (config) => {
        config.name = name;
        config.human = human;
        config.noCondition = noCondition;
        config.yesCondition = yesCondition;
        config.task = task;
        config.example = Array.isArray(example) ? example?.join('\\n') : '';
        config.preamble = preamble;
        config.updatedBy = props.user._id;
        return config;
    };

    const getUserConfig = () => {
        client
            .service('config')
            .find({ query: { $limit: 10000, createdBy: props.user._id } })
            .then((res) => {
                const results = res.data;
                if (results && results.length > 0) {
                    props.setRefUserConfig(results);
                    setBehaviorForm(results[0]);
                    setMaxCount(results.length);
                    props.setNumConfig(count + 1);
                } else {
                    getRefConfig();
                    props.setNumConfig(1);
                }
            })
            .catch((error) => {
                props.alert({
                    title: 'documents',
                    type: 'error',
                    message: error.message || 'Failed get ref config'
                });
            });
    };

    const getRefConfig = () => {
        client
            .service('refconfig')
            .find({ query: { $limit: 10000 } })
            .then((res) => {
                const results = res.data;
                if (results && results.length > 0) {
                    props.setRefUserConfig(results);
                    setBehaviorForm(results[0]);
                    setMaxCount(results.length);
                    let newConfig = results[0];
                    newConfig._id = null;
                    client.service('config').create(newConfig);
                }
            })
            .catch((error) => {
                props.alert({
                    title: 'documents',
                    type: 'error',
                    message: error.message || 'Failed get user config'
                });
            });
    };

    const onSaveAs = () => {
        const serviceName = 'config';
        const selectedConfigObjectAry = props.refUserConfig.filter((conf) => conf._id === props.selectedConfigId);
        const selectedConfigObject = getBehaviorForm(selectedConfigObjectAry[0]);
        console.log('selectedConfigObject', selectedConfigObject);
        client
            .service(serviceName)
            .create(selectedConfigObject)
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                props.alert({
                    title: serviceName,
                    type: `error`,
                    message: error.message || `Failed on Save As ${serviceName}`
                });
            });
    };

    const onPatch = () => {
        const serviceName = 'config';
        const selectedConfigObjectAry = props.refUserConfig.filter((conf) => conf._id === props.selectedConfigId);

        const selectedConfigObject = getBehaviorForm(selectedConfigObjectAry[0]);
        console.log('patch', 'selectedConfigObject', selectedConfigObject);
        client
            .service(serviceName)
            .patch(props.selectedConfigId, selectedConfigObject)
            .then((results) => {
                console.log(results);
            })
            .catch((error) => {
                props.alert({
                    title: serviceName,
                    type: `error`,
                    message: error.message || `Failed on Update ${serviceName}`
                });
            });
    };

    return (
        <div className="card grid grid-nogutter flex" style={{ width: '40vw' }}>
            <div className="col-6">
                <h3>The prompt behavior</h3>
            </div>
            <div className="col-6 flex justify-content-end">
                <i className="pi pi-fw pi-angle-left mt-4" onClick={() => onBack()}></i>
                <span className="mt-4">{`item ${count + 1} of ${props.refUserConfig?.length} `}</span>
                <i className="pi pi-fw pi-angle-right mt-4" onClick={() => onFront()}></i>
                {isEdit ? (
                    <Button
                        label={saveAs !== '' ? 'Save As' : 'Update'}
                        icon="pi pi-save"
                        className="m-2"
                        size="small"
                        iconPos="right"
                        rounded
                        text
                        severity="danger"
                        aria-label="Save"
                        onClick={() => {
                            saveAs !== '' ? onSaveAs() : onPatch();
                            setEdit(false);
                        }}
                    />
                ) : (
                    <Button label="Edit" icon="pi pi-pencil" className="m-2" size="small" iconPos="right" rounded text severity="danger" aria-label="Edit" onClick={() => setEdit(true)} />
                )}
            </div>
            {isEdit ? (
                <div className="col-12 fadein animation-duration-2000">
                    <label id="label_name" className="mb-2 flex justify-content-start">
                        Name <small className="ml-3 mt-1">(short identifier)</small>:
                    </label>
                    <InputText
                        className="w-full"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setSaveAs(e.value);
                        }}
                        disabled={!isEdit}
                    />
                </div>
            ) : null}

            <div className="col-12">
                <label id="label_human" className="mb-2 flex justify-content-start">
                    Human:
                </label>
                <InputTextarea autoResize rows={5} className="w-full" value={human} onChange={(e) => setHuman(e.target.value)} disabled={!isEdit} />
            </div>

            <div className="col-12">
                <label id="label_noCondition" className="mb-2 flex justify-content-start">
                    No Condition:
                </label>
                <InputTextarea autoResize className="w-full" value={noCondition} onChange={(e) => setNoCondition(e.target.value)} disabled={!isEdit} />
            </div>

            <div className="col-12">
                <label id="label_yesCondition" className="mb-2 flex justify-content-start">
                    Yes Condition:
                </label>
                <InputTextarea autoResize rows={5} className="w-full" value={yesCondition} onChange={(e) => setYesCondition(e.target.value)} disabled={!isEdit} />
            </div>

            <div className="col-12">
                <label id="label_task" className="mb-2 flex justify-content-start">
                    The task:
                </label>
                <InputTextarea autoResize className="w-full" value={task} onChange={(e) => setTask(e.target.value)} disabled={!isEdit} />
            </div>

            <div className="col-12">
                <label id="label_example" className="mb-2 flex justify-content-start">
                    Example Output:
                </label>
                <InputTextarea autoResize rows={12} className="w-full" value={example} onChange={(e) => setExample(e.target.value)} disabled={!isEdit} />
            </div>

            <div className="col-12">
                <label id="label_preamble" className="mb-2 flex justify-content-start">
                    Preamble:
                </label>
                <InputTextarea autoResize rows={5} className="w-full" value={preamble} onChange={(e) => setPreamble(e.target.value)} disabled={!isEdit} />
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiProjectActionBehaviorsPage);
