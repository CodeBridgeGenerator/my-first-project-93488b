import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import initilization from '../../utils/init';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import config from '../../resources/config.json';

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
    const [items, setItems] = useState([]);
    const [fieldItems, setFieldItems] = useState([]);
    const urlParams = useParams();

    const fromFields = _.find(config.services, {
        serviceName: props?.service?.from
    })?.schemaList.map((f) => {
        return { name: f.label, value: f.fieldName, type: f.type };
    });
    const toFields = _.find(config.services, {
        serviceName: props?.service?.to2
    })?.schemaList.map((f) => {
        return { name: f.label, value: f.fieldName, type: f.type };
    });

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

        if (_.isEmpty(_entity?.from)) {
            error['from'] = `From field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.to2)) {
            error['to2'] = `Destination field is required`;
            ret = false;
        }

        if (!ret) setError(error);
        return ret;
    };

    const onSave = async () => {
        if (!validate()) return;
        console.log(_entity);
        let _data = {
            dynaLoader: props.service._id,
            from: _entity?.from.value,
            fromType: _entity?.from.type,
            fromRefService: _entity?.from.refServiceName,
            fromRelationship: _entity?.from.relationship,
            fromIdentityFieldName: _entity?.from.identifierFieldName,
            to2: _entity?.to2.value,
            toType: _entity?.to2.type,
            toRefService: _entity?.to2.refServiceName,
            toRelationship: _entity?.to2.relationship,
            toIdentityFieldName: _entity?.to2.identifierFieldName,
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

    //   // on mount dynaLoader
    //   client
    //     .service("dynaLoader")
    //     .find({
    //       query: {
    //         $limit: 10000,
    //         $sort: { createdAt: -1 },
    //         _id: urlParams.singleDynaLoaderId,
    //       },
    //     })
    //     .then((res) => {
    //       setDynaLoader(
    //         res.data.map((e) => {
    //           return { name: e["name"], value: e._id };
    //         }),
    //       );
    //     })
    //     .catch((error) => {
    //       console.log({ error });
    //       props.alert({
    //         title: "DynaLoader",
    //         type: "error",
    //         message: error.message || "Failed get dynaLoader",
    //       });
    //     });
    // }, []);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered;

            if (!event.query.trim().length) {
                _filtered = fromFields;
            } else {
                _filtered = fromFields.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setItems(_filtered);
        }, 250);
    };

    const searchSubItems = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered;

            if (!event.query.trim().length) {
                _filtered = toFields;
            } else {
                _filtered = toFields.filter((i) => {
                    return i.name !== _entity?.from && i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFieldItems(_filtered);
        }, 250);
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
        <Dialog header="Create Dyna Fields" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="dynaFields-create-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <h5>{props.service?.from}</h5>
                        <label htmlFor="from">From Field to:</label>
                        <AutoComplete id="from" className="w-full mb-3 p-inputtext-sm" value={_entity?.from} suggestions={items} field="name" completeMethod={search} onChange={(e) => setValByKey('from', e.value)} dropdown />
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
                        <h5>{props.service?.to2}</h5>
                        <label htmlFor="to2">Desitnation Field:</label>

                        <AutoComplete id="to2" className="w-full mb-3 p-inputtext-sm" value={_entity?.to2} suggestions={fieldItems} field="name" completeMethod={searchSubItems} onChange={(e) => setValByKey('to2', e.value)} dropdown disabled={!_entity?.from} />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['to2']) ? (
                            <p className="m-0" key="error-to2">
                                {error['to2']}
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
