import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
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

const DynaFieldsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [dynaLoader, setDynaLoader] = useState([]);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
        //on mount dynaLoader
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

    const onSave = async () => {
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
            toRelationship: _entity?.toRelationship
        };

        setLoading(true);
        try {
            await client.service('dynaFields').patch(_entity._id, _data);
            const eagerResult = await client.service('dynaFields').find({
                query: {
                    $limit: 10000,
                    _id: { $in: [_entity._id] },
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
                title: 'Edit info',
                message: 'Info dynaFields updated successfully'
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
        setError({});
    };

    return (
        <Dialog header="Edit Dyna Fields" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="dynaFields-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5"></div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="from">From Field:</label>
                        <InputText id="from" className="w-full mb-3 p-inputtext-sm" value={_entity?.from} onChange={(e) => setValByKey('from', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromType">From Field Type:</label>
                        <InputText id="fromType" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromType} onChange={(e) => setValByKey('fromType', e.target.value)} required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="to2">To Field:</label>
                        <InputText id="to2" className="w-full mb-3 p-inputtext-sm" value={_entity?.to2} onChange={(e) => setValByKey('to2', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toType">To Field Type:</label>
                        <InputText id="toType" className="w-full mb-3 p-inputtext-sm" value={_entity?.toType} onChange={(e) => setValByKey('toType', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromRefService">From Ref Service:</label>
                        <InputText id="fromRefService" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromRefService} onChange={(e) => setValByKey('fromRefService', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toRefService">To Ref Service:</label>
                        <InputText id="toRefService" className="w-full mb-3 p-inputtext-sm" value={_entity?.toRefService} onChange={(e) => setValByKey('toRefService', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromIdentityFieldName">From Field Identity:</label>
                        <InputText id="fromIdentityFieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromIdentityFieldName} onChange={(e) => setValByKey('fromIdentityFieldName', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toIdentityFieldName">To Field Identity:</label>
                        <InputText id="toIdentityFieldName" className="w-full mb-3 p-inputtext-sm" value={_entity?.toIdentityFieldName} onChange={(e) => setValByKey('toIdentityFieldName', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="fromRelationship">From Field Relationship:</label>
                        <InputText id="fromRelationship" className="w-full mb-3 p-inputtext-sm" value={_entity?.fromRelationship} onChange={(e) => setValByKey('fromRelationship', e.target.value)} />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="toRelationship">To Field Relationship:</label>
                        <InputText id="toRelationship" className="w-full mb-3 p-inputtext-sm" value={_entity?.toRelationship} onChange={(e) => setValByKey('toRelationship', e.target.value)} />
                    </span>
                </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="created At:"></Tag>
                        {' ' + moment(_entity?.createdAt).fromNow()}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="created By:"></Tag>
                        {' ' + _entity?.createdBy?.name}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="last Updated At:"></Tag>
                        {' ' + moment(_entity?.updatedAt).fromNow()}
                    </p>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <p className="m-0">
                        <Tag value="last Updated By:"></Tag>
                        {' ' + _entity?.updatedBy?.name}
                    </p>
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
