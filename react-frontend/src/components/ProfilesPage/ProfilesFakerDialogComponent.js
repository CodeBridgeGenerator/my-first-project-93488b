import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import profilesFakerFactory from './profilesFakerFactory';

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

const ProfilesFakerDialogComponent = (props) => {
    const [fakerCount, setFakerCount] = useState(1);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userIdIds, setuserIdIds] = useState();
    const [departmentIds, setdepartmentIds] = useState();
    const [sectionIds, setsectionIds] = useState();
    const [positionIds, setpositionIds] = useState();
    const [managerIds, setmanagerIds] = useState();
    const [companyIds, setcompanyIds] = useState();
    const [branchIds, setbranchIds] = useState();
    const [addressIds, setaddressIds] = useState();
    const [phoneIds, setphoneIds] = useState();

    useEffect(() => {
        setFakerCount(1);

        client
            .service('users')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setuserIdIds(data.data);
            });
        client
            .service('departments')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setdepartmentIds(data.data);
            });
        client
            .service('sections')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setsectionIds(data.data);
            });
        client
            .service('positions')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setpositionIds(data.data);
            });
        client
            .service('users')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setmanagerIds(data.data);
            });
        client
            .service('companies')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setcompanyIds(data.data);
            });
        client
            .service('branches')
            .find({ query: { $select: ['_id', 'name'] } })
            .then((data) => {
                setbranchIds(data.data);
            });
        client
            .service('userAddresses')
            .find({ query: { $select: ['_id', 'Street1'] } })
            .then((data) => {
                setaddressIds(data.data);
            });
        client
            .service('userPhones')
            .find({ query: { $select: ['_id', 'number'] } })
            .then((data) => {
                setphoneIds(data.data);
            });
    }, [props.show]);

    const onRun = async () => {
        let fakeData = profilesFakerFactory(props.user, fakerCount, userIdIds, departmentIds, sectionIds, positionIds, managerIds, companyIds, branchIds, addressIds, phoneIds);

        setLoading(true);
        const promises = fakeData.map((elem) => client.service('profiles').create(elem));
        const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
        const errors = results.filter((result) => result instanceof Error).map((err, index) => `[${index}] ${getSchemaValidationErrorsStrings(err) || 'Failed to create fake record'}`);
        const validResults = results.filter((result) => !(result instanceof Error));
        props.alert({
            type: 'success',
            title: 'Faker',
            message: 'Faker ran successfully'
        });
        props.onFakerCreateResults(validResults);
        setErrors(errors);
        setLoading(false);
        if (!(errors && errors.length)) props.onHide();
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="run" className="p-button-text no-focus-effect" onClick={onRun} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const onChangeFakerCountHandler = (e) => {
        let val = e.target.value;
        val = Number(val);
        if (val < 1) val = 1;
        if (val > 100) val = 100;
        setFakerCount(val);
    };

    return (
        <Dialog header="Faker" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div>
                    <p className="m-0">Faker count:</p>
                    <InputText className="w-full mb-3" type="number" value={fakerCount} onChange={onChangeFakerCountHandler} />
                </div>

                <small className="p-error">
                    {Array.isArray(errors)
                        ? errors.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : errors}
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

export default connect(mapState, mapDispatch)(ProfilesFakerDialogComponent);
