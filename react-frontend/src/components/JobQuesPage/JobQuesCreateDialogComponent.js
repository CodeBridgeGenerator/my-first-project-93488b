import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg[key] = element.message;
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error: errorObj.message } : {};
};

const JobQuesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dynaLoaderId, setDynaLoaderId] = useState([]);

    useEffect(() => {
        let init = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [dynaLoaderId], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.email)) {
            error['email'] = `Email field is required`;
            ret = false;
        }
        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            dynaLoaderId: _entity?.dynaLoaderId?._id,
            email: _entity?.email,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('jobQues').create(_data);
            const eagerResult = await client.service('jobQues').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'dynaLoaderId',
                            service: 'dynaLoader',
                            select: ['name']
                        }
                    ]
                }
            });
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Job Ques updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Job Ques'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        // on mount dynaLoader
        client
            .service('dynaLoader')
            .find({
                query: {
                    $limit: 10000,
                    $sort: { createdAt: -1 },
                    _id: urlParams.singleDynaLoaderId
                }
            })
            .then((res) => {
                setDynaLoaderId(
                    res.data.map((e) => {
                        return { name: e['name'], value: e._id };
                    })
                );
            })
            .catch((error) => {
                props.alert({
                    title: 'DynaLoader',
                    type: 'error',
                    message: error.message || 'Failed get dynaLoader'
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
        setError({});
    };

    const dynaLoaderIdOptions = dynaLoaderId.map((elem) => ({
        name: elem.name,
        value: elem.value
    }));

    return (
        <Dialog header="Create Job Ques" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="jobQues-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="dynaLoaderId">DynaLoader Id:</label>
                        <Dropdown id="dynaLoaderId" value={_entity?.dynaLoaderId?._id} optionLabel="name" optionValue="value" options={dynaLoaderIdOptions} onChange={(e) => setValByKey('dynaLoaderId', { _id: e.value })} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['dynaLoaderId']) ? (
                            <p className="m-0" key="error-dynaLoaderId">
                                {error['dynaLoaderId']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="email">Email:</label>
                        <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey('email', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['email']) ? (
                            <p className="m-0" key="error-email">
                                {error['email']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <small className="p-error">
                    {Array.isArray(Object.keys(error))
                        ? Object.keys(error).map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}: {error[e]}
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

export default connect(mapState, mapDispatch)(JobQuesCreateDialogComponent);
