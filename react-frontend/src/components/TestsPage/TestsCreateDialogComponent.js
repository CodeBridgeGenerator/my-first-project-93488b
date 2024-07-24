import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

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

const TestsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();

    useEffect(() => {
        let init = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            stack: _entity?.stack,
            service: _entity?.service,
            passed: _entity?.passed,
            failed: _entity?.failed,
            notes: _entity?.notes,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('tests').create(_data);
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Tests created successfully'
            });
            props.onCreateResult(result);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Tests'
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
        setError({});
    };

    return (
        <Dialog header="Create Tests" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="tests-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="stack">Stack:</label>
                        <InputText id="stack" className="w-full mb-3 p-inputtext-sm" value={_entity?.stack} onChange={(e) => setValByKey('stack', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['stack']) ? (
                            <p className="m-0" key="error-stack">
                                {error['stack']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="service">Service:</label>
                        <InputText id="service" className="w-full mb-3 p-inputtext-sm" value={_entity?.service} onChange={(e) => setValByKey('service', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['service']) ? (
                            <p className="m-0" key="error-service">
                                {error['service']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="passed">Passed:</label>
                        <InputNumber id="passed" className="w-full mb-3" value={_entity?.passed} onChange={(e) => setValByKey('passed', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['passed']) ? (
                            <p className="m-0" key="error-passed">
                                {error['passed']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="failed">Failed:</label>
                        <InputNumber id="failed" className="w-full mb-3" value={_entity?.failed} onChange={(e) => setValByKey('failed', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['failed']) ? (
                            <p className="m-0" key="error-failed">
                                {error['failed']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="notes">Notes:</label>
                        <InputText id="notes" className="w-full mb-3 p-inputtext-sm" value={_entity?.notes} onChange={(e) => setValByKey('notes', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['notes']) ? (
                            <p className="m-0" key="error-notes">
                                {error['notes']}
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

export default connect(mapState, mapDispatch)(TestsCreateDialogComponent);
