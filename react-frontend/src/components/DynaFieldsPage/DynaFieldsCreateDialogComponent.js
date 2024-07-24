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

const DynaFieldsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dynaLoader, setDynaLoader] = useState([]);

    useEffect(() => {
        let init = { duplicates: false };
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({ ...init });
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.dynaLoader)) {
            error['dynaLoader'] = `DynaLoader field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.fromType)) {
            error['fromType'] = `From Field Type field is required`;
            ret = false;
        }
        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            dynaLoader: _entity?.dynaLoader?._id,
            from: _entity?.from,
            fromType: _entity?.fromType,
            to2: _entity?.to2,
            toType: _entity?.toType,
            fromRefService: _entity?.fromRefService,
            toRefService: _entity?.toRefService,
            fromIdentityFieldName: _entity?.fromIdentityFieldName,
            toIdentityFieldName: _entity?.toIdentityFieldName,
            fromRelationship: _entity?.fromRelationship,
            toRelationship: _entity?.toRelationship,
            duplicates: _entity?.duplicates || false,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('dynaFields').create(_data);
            const eagerResult = await client.service('dynaFields').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [result._id] },
                    $populate: [
                        {
                            path: 'dynaLoader',
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
                message: 'Info Dyna Fields updated successfully'
            });
            props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Dyna Fields'
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
                setDynaLoader(
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

    return (
        <Dialog header="Create Dyna Fields" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="dynaFields-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="from">From Field:</label>
                        <InputText id="from" className="w-full mb-3 p-inputtext-sm" value={_entity?.from} onChange={(e) => setValByKey('from', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['from']) ? (
                            <p className="m-0" key="error-from">
                                {error['from']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromType">From Field Type:</label>
                        <InputText id="fromType" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromType} onChange={(e) => setValByKey('fromType', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fromType']) ? (
                            <p className="m-0" key="error-fromType">
                                {error['fromType']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="to2">To Field:</label>
                        <InputText id="to2" className="w-full mb-3 p-inputtext-sm" value={_entity?.to2} onChange={(e) => setValByKey('to2', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['to2']) ? (
                            <p className="m-0" key="error-to2">
                                {error['to2']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toType">To Field Type:</label>
                        <InputText id="toType" className="w-full mb-3 p-inputtext-sm" value={_entity?.toType} onChange={(e) => setValByKey('toType', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['toType']) ? (
                            <p className="m-0" key="error-toType">
                                {error['toType']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromRefService">From Ref Service:</label>
                        <InputText id="fromRefService" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromRefService} onChange={(e) => setValByKey('fromRefService', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fromRefService']) ? (
                            <p className="m-0" key="error-fromRefService">
                                {error['fromRefService']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toRefService">To Ref Service:</label>
                        <InputText id="toRefService" className="w-full mb-3 p-inputtext-sm" value={_entity?.toRefService} onChange={(e) => setValByKey('toRefService', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['toRefService']) ? (
                            <p className="m-0" key="error-toRefService">
                                {error['toRefService']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromIdentityFieldName">From Field Identity:</label>
                        <InputText id="fromIdentityFieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromIdentityFieldName} onChange={(e) => setValByKey('fromIdentityFieldName', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fromIdentityFieldName']) ? (
                            <p className="m-0" key="error-fromIdentityFieldName">
                                {error['fromIdentityFieldName']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toIdentityFieldName">To Field Identity:</label>
                        <InputText id="toIdentityFieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.toIdentityFieldName} onChange={(e) => setValByKey('toIdentityFieldName', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['toIdentityFieldName']) ? (
                            <p className="m-0" key="error-toIdentityFieldName">
                                {error['toIdentityFieldName']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromRelationship">From Field Relationship:</label>
                        <InputText id="fromRelationship" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromRelationship} onChange={(e) => setValByKey('fromRelationship', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['fromRelationship']) ? (
                            <p className="m-0" key="error-fromRelationship">
                                {error['fromRelationship']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toRelationship">To Field Relationship:</label>
                        <InputText id="toRelationship" className="w-full mb-3 p-inputtext-sm" value={_entity?.toRelationship} onChange={(e) => setValByKey('toRelationship', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['toRelationship']) ? (
                            <p className="m-0" key="error-toRelationship">
                                {error['toRelationship']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field flex mt-5">
                    <span className="align-items-center">
                        <label htmlFor="duplicates">Duplicates:</label>
                        <InputText id="duplicates" className="w-full mb-3 p-inputtext-sm" value={_entity?.duplicates} onChange={(e) => setValByKey('duplicates', e.target.value)} required />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['duplicates']) ? (
                            <p className="m-0" key="error-duplicates">
                                {error['duplicates']}
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

export default connect(mapState, mapDispatch)(DynaFieldsCreateDialogComponent);
