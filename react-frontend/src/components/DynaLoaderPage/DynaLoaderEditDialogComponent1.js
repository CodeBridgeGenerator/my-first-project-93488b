import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

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

const DynaLoaderEditDialogComponent = (props) => {
    const navigate = useNavigate();
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [process, setProcess] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(props.entity);
        set_entity(props.entity);
        if (props?.entity?._id) {
            try {
                setProcess([]);
                if (process?.length === 0) populateData();
            } catch (err) {
                props.alert({
                    type: 'error',
                    title: 'Created',
                    message: err
                });
            }
        }
    }, [props.entity]);

    const populateData = async () => {
        setLoading(true);
        const dynafields = client.service('dynaFields').find({
            query: {
                dynaLoader: props.entity._id,
                $sort: {
                    toRefService: 1
                }
            }
        });
        const fromDataPromise = client.service(props.entity.from).find({});
        const toDataPromise = client.service(props.entity.to2).find({});
        const dynaAllfields = client.service('dynaFields').find({});

        const results = await Promise.all([dynafields, fromDataPromise, toDataPromise, dynaAllfields]);

        await checkFields(results[0].data, results[1].data, results[2].data, results[3].data);
        setTimeout(() => setLoading(false), 1000);
    };

    const checkFields = async (dynafields, fromData, toData, dynaAllfields) => {
        const objectIds = {};
        // console.log(dynafields);
        // console.log(dynaAllfields);
        const dynaRelFields = _.filter(dynaAllfields, {
            toService: dynafields[0].toService
        });
        // console.log(dynaRelFields);
        dynafields?.forEach((field, i) => {
            const obj = {
                fromData: _.uniq(_.map(fromData, field.from)),
                from: field.from,
                fromType: field.fromType,
                fromService: field.fromService,
                promise: field.toRefService ? client.service(field.toRefService).find({}) : client.service(field.toService).find({}),
                toData: _.map(toData, field.to2),
                to2: field.to2,
                toType: field.toType,
                toService: field.toService,
                toRefService: field?.toRefService,
                identifier: field?.identifierFieldName
            };
            objectIds[i] = obj;
        });

        // console.log(objectIds);
        const promises = await Promise.all(
            Object.entries(objectIds).map((obj) => {
                obj[1].promise;
            })
        );
        let _process = [];
        Object.entries(objectIds).forEach(async (obj) => {
            if (obj[1]?.toRefService) {
                const l = await obj[1].promise;
                const toIds = _.uniq(_.map(l?.data, obj[1]?.identifier));
                const missing1 = _.difference(obj[1].fromData, toIds);
                // console.log("toIds", toIds);
                // console.log("fromData",obj[1].fromData);
                // console.log("missing1", missing1);
                // console.log("object", obj[1]);
                const missingSorted = missing1.sort((a, b) => String(a).localeCompare(String(b)));
                if (missing1?.length > 0) {
                    const process1 = missingSorted?.map((m) => {
                        if (obj[1]?.toRefService) {
                            const create = {};
                            let query = {};
                            query[obj[1].from] = m;
                            create['source'] = _.find(fromData, query);
                            create['loader'] = dynafields;
                            create['loaderFields'] = dynaAllfields;
                            return {
                                toRefService: obj[1]?.toRefService,
                                ...create,
                                value: m,
                                field: obj[1]?.identifier
                            };
                        } else return null;
                    });
                    _process = _process?.length > 0 && process1?.length > 0 ? _process.push(process1) : _process;
                }
            } else if (obj[1]?.toService) {
                const toIds = _.uniq(_.map(toData, obj[1]?.to2 || 'name'));
                const missing1 = _.difference(obj[1].fromData, toIds);
                // console.log("toIds", toIds);
                // console.log("fromData",obj[1].fromData);
                // console.log("missing1", missing1);
                // console.log("object", obj[1]);
                const missingSorted = missing1.sort((a, b) => String(a).localeCompare(String(b)));
                const process1 = missingSorted?.map((m) => {
                    const create = {};
                    let query = {};
                    query[obj[1].from] = m;
                    create['source'] = _.find(fromData, query);
                    create['loader'] = dynafields;
                    create['loaderFields'] = dynaRelFields;
                    return {
                        toService: obj[1]?.toService,
                        ...create,
                        value: m,
                        field: obj[1]?.to2
                    };
                });
                _process = _process?.length > 0 && process1?.length > 0 ? _process.push(process1) : process1;
            }
        });
        // console.log(_process);
        setProcess(_process);
        // console.log(objectIds);
    };

    const onCreateJobQue = async () => {
        try {
            const start = Date.now();
            const _data = {
                dynaLoaderId: _entity?._id,
                name: _entity?.name,
                fromService: _entity?.from,
                toService: _entity?.to2,
                type: 'dynaloader',
                start: start,
                end: start,
                email: 'kana@cloudbasha.com', //props.user?.email,
                createdBy: props.user._id,
                updatedBy: props.user._id
            };
            // console.log(_data);
            const results = await client.service('jobQues').create(_data);
            props.onHide(true);
            console.log(results);
        } catch (error) {
            console.log('error', error);
        }
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button text label="run job" icon="pi pi-send" className="mr-8" onClick={() => onCreateJobQue()} role="dynaLoader-run-button" loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} loading={loading} />
        </div>
    );

    const renderActions = () => {
        console.log(process);
        const processHtml = process?.map((e, i) => (
            <>
                <div key={`prc-name${i}`} className="col-12 md:col-4">
                    <label>{e?.loader[0]?.from}</label>
                </div>
                <div key={`prc-add${i}`} className="col-12 md:col-4 mb-1" style={{ maxWidth: '12vw' }}>
                    <Button key={`prc-link${i}`} icon="pi pi-plus" size="small" label={`${e?.value}`} onClick={() => goto(e.toRefService, e)}></Button>
                </div>
                <div key={`prc-source${i}`} className="col-12 col-offset-1 md:col-3">
                    <label> {e?.loader[0]?.to2}</label>
                    {/* <label>{JSON.stringify(e.loaderFields)}</label> */}
                </div>
            </>
        ));

        return (
            <>
                <div key={_entity?.to2} className="col-12 md:col-4 mt-5">
                    <h5>Source: {_entity?.from} </h5>
                </div>

                <div key="action" className="col-12 md:col-4 mt-5" style={{ maxWidth: '12vw' }}>
                    <h5>Action: Upsert</h5>
                </div>
                <div key={_entity?.from} className="col-12 col-offset-1 md:col-3 mt-5">
                    <h5> destination : {_entity?.to2}</h5>
                </div>
                {process?.length > 0 ? processHtml : null}
            </>
        );
    };

    const renderTypes = () => {
        const processHtml = process?.map((e, i) => (
            <>
                <div key={`prc-name${i}`} className="col-12 md:col-4">
                    <small>{e?.source['sectdesc']}</small>
                </div>
                <div key={`prc-add${i}`} className="col-12 md:col-4 mb-1" style={{ maxWidth: '12vw' }}>
                    <Button key={`prc-link${i}`} icon="pi pi-plus" size="small" label={`${e?.value}`} onClick={() => goto(e?.toRefService, e)}></Button>
                </div>
                <div key={`prc-source${i}`} className="col-12 col-offset-1 md:col-4">
                    <small>to {e?.toRefService}</small>
                </div>
            </>
        ));

        return (
            <>
                <div className="col-12 md:col-4 mt-5">
                    <h5>Service: {_entity?.to2}</h5>
                </div>

                <div className="col-12 md:col-4 mt-5" style={{ maxWidth: '15vw' }}>
                    <h5>Action</h5>
                </div>
                <div className="col-12 col-offset-1 md:col-4 mt-5">
                    <h5>From {_entity?.from} and create in</h5>
                </div>
                {processHtml}
            </>
        );
    };

    const goto = (service, data) => {
        console.log('location state', data);
        if (typeof service == 'undefined') {
            props.layoutCurrentTab2(data.toService);
            navigate(`/${data.toService}`, { state: { action: 'create', data } });
        } else {
            props.layoutCurrentTab2(service);
            navigate(`/${service}`, { state: { action: 'create', data } });
        }
    };

    return (
        <Dialog header={`DynaLoader : ${_entity?.name}`} visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '65vw' }} role="dynaLoader-edit-dialog-component">
                {process?.length > 0 ? renderActions() : <div className="m-5">Save to run the dynaloder</div>}
                {/* {process?.length > 0 ? renderTypes() : null} */}
            </div>
            <div></div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    layoutCurrentTab: (bool) => dispatch.layout.activeTab(bool),
    layoutCurrentTab2: (bool) => dispatch.layout.activeTab2(bool)
});

export default connect(mapState, mapDispatch)(DynaLoaderEditDialogComponent);
