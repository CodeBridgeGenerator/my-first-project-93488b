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

const StaffinfoCreateDialogComponent = (props) => {
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
            empno: _entity?.empno,
            name: _entity?.name,
            namenric: _entity?.namenric,
            compcode: _entity?.compcode,
            compname: _entity?.compname,
            deptcode: _entity?.deptcode,
            deptdesc: _entity?.deptdesc,
            sectcode: _entity?.sectcode,
            sectdesc: _entity?.sectdesc,
            designation: _entity?.designation,
            email: _entity?.email,
            resign: _entity?.resign,
            supervisor: _entity?.supervisor,
            datejoin: _entity?.datejoin,
            empgroup: _entity?.empgroup,
            empgradecode: _entity?.empgradecode,
            terminationdate: _entity?.terminationdate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('staffinfo').create(_data);
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info Staffinfo created successfully'
            });
            props.onCreateResult(result);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in Staffinfo'
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
        <Dialog header="Create Staffinfo" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="staffinfo-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empno">Empno:</label>
                        <InputNumber id="empno" className="w-full mb-3 p-inputtext-sm" value={_entity?.empno} onChange={(e) => setValByKey('empno', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empno']) ? (
                            <p className="m-0" key="error-empno">
                                {error['empno']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="name">Name:</label>
                        <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey('name', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['name']) ? (
                            <p className="m-0" key="error-name">
                                {error['name']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="namenric">Namenric:</label>
                        <InputText id="namenric" className="w-full mb-3 p-inputtext-sm" value={_entity?.namenric} onChange={(e) => setValByKey('namenric', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['namenric']) ? (
                            <p className="m-0" key="error-namenric">
                                {error['namenric']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="compcode">Compcode:</label>
                        <InputNumber id="compcode" className="w-full mb-3 p-inputtext-sm" value={_entity?.compcode} onChange={(e) => setValByKey('compcode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['compcode']) ? (
                            <p className="m-0" key="error-compcode">
                                {error['compcode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="compname">Compname:</label>
                        <InputText id="compname" className="w-full mb-3 p-inputtext-sm" value={_entity?.compname} onChange={(e) => setValByKey('compname', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['compname']) ? (
                            <p className="m-0" key="error-compname">
                                {error['compname']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deptcode">Deptcode:</label>
                        <InputText id="deptcode" className="w-full mb-3 p-inputtext-sm" value={_entity?.deptcode} onChange={(e) => setValByKey('deptcode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['deptcode']) ? (
                            <p className="m-0" key="error-deptcode">
                                {error['deptcode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="deptdesc">Deptdesc:</label>
                        <InputText id="deptdesc" className="w-full mb-3 p-inputtext-sm" value={_entity?.deptdesc} onChange={(e) => setValByKey('deptdesc', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['deptdesc']) ? (
                            <p className="m-0" key="error-deptdesc">
                                {error['deptdesc']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="sectcode">Sectcode:</label>
                        <InputNumber id="sectcode" className="w-full mb-3 p-inputtext-sm" value={_entity?.sectcode} onChange={(e) => setValByKey('sectcode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['sectcode']) ? (
                            <p className="m-0" key="error-sectcode">
                                {error['sectcode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="sectdesc">Sectdesc:</label>
                        <InputText id="sectdesc" className="w-full mb-3 p-inputtext-sm" value={_entity?.sectdesc} onChange={(e) => setValByKey('sectdesc', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['sectdesc']) ? (
                            <p className="m-0" key="error-sectdesc">
                                {error['sectdesc']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="designation">Designation:</label>
                        <InputText id="designation" className="w-full mb-3 p-inputtext-sm" value={_entity?.designation} onChange={(e) => setValByKey('designation', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['designation']) ? (
                            <p className="m-0" key="error-designation">
                                {error['designation']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="email">Email:</label>
                        <InputText id="email" className="w-full mb-3 p-inputtext-sm" value={_entity?.email} onChange={(e) => setValByKey('email', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['email']) ? (
                            <p className="m-0" key="error-email">
                                {error['email']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="resign">Resign:</label>
                        <InputText id="resign" className="w-full mb-3 p-inputtext-sm" value={_entity?.resign} onChange={(e) => setValByKey('resign', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['resign']) ? (
                            <p className="m-0" key="error-resign">
                                {error['resign']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="supervisor">Supervisor:</label>
                        <InputText id="supervisor" className="w-full mb-3 p-inputtext-sm" value={_entity?.supervisor} onChange={(e) => setValByKey('supervisor', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['supervisor']) ? (
                            <p className="m-0" key="error-supervisor">
                                {error['supervisor']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="datejoin">Datejoin:</label>
                        <InputNumber id="datejoin" className="w-full mb-3 p-inputtext-sm" value={_entity?.datejoin} onChange={(e) => setValByKey('datejoin', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['datejoin']) ? (
                            <p className="m-0" key="error-datejoin">
                                {error['datejoin']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empgroup">Empgroup:</label>
                        <InputText id="empgroup" className="w-full mb-3 p-inputtext-sm" value={_entity?.empgroup} onChange={(e) => setValByKey('empgroup', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empgroup']) ? (
                            <p className="m-0" key="error-empgroup">
                                {error['empgroup']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="empgradecode">Empgradecode:</label>
                        <InputText id="empgradecode" className="w-full mb-3 p-inputtext-sm" value={_entity?.empgradecode} onChange={(e) => setValByKey('empgradecode', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['empgradecode']) ? (
                            <p className="m-0" key="error-empgradecode">
                                {error['empgradecode']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="terminationdate">Terminationdate:</label>
                        <InputText id="terminationdate" className="w-full mb-3 p-inputtext-sm" value={_entity?.terminationdate} onChange={(e) => setValByKey('terminationdate', e.target.value)} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['terminationdate']) ? (
                            <p className="m-0" key="error-terminationdate">
                                {error['terminationdate']}
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

export default connect(mapState, mapDispatch)(StaffinfoCreateDialogComponent);
