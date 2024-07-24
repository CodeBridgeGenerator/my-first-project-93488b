import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _, { find } from 'lodash';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import config from '../../resources/config.json';
import standard from '../../resources/standard.json';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const allServices = _.merge(
    _.get(config, 'services').map((s) => {
        return {
            name: s.displayName,
            value: s.serviceName,
            schemaList: s.schemaList
        };
    }),
    _.get(standard, 'services').map((s) => {
        return {
            name: s.displayName,
            value: s.serviceName,
            schemaList: s.schemaList
        };
    })
);

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

const DynaLoaderCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [allServicesLimited, setAllItems] = useState([]);
    const [_field, set_field] = useState({});
    const [_value, set_value] = useState({});
    const [fields, setFields] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();

    useEffect(() => {
        const predicate = (service) => (_.find(props.data, { to2: service.value }) ? true : false);
        const _allServices = allServices.filter((service) => !predicate(service));
        setAllItems(_allServices);
    }, [loading]);

    const validate = () => {
        let ret = true;
        const error = {};

        if (_.isEmpty(_entity?.from)) {
            error['from'] = `Source service field is required`;
            ret = false;
        }

        if (_.isEmpty(_entity?.to2)) {
            error['to2'] = `Destination service field is required`;
            ret = false;
        }

        if (!ret) setError(error);
        return ret;
    };

    const onSaveFields = async (result) => {
        if (_.isEmpty(_field)) return;
        const data = [];
        Object.entries(_field).forEach((k) => {
            const toField = _.find(_entity?.to2?.schemaList, { fieldName: k[0] });
            if (k[1]?.value && k[0] !== null && toField) {
                let _data = {
                    dynaLoader: result?._id,
                    from: k[1]?.value,
                    fromType: k[1]?.type,
                    fromService: _entity?.from?.value,
                    to2: k[0],
                    toType: toField.type,
                    toService: _entity?.to2?.value,
                    toRefService: toField?.reference?.refServiceName,
                    toRefRelationship: toField?.reference?.relationshipType,
                    toRefDatabaseName: toField?.reference?.refDatabaseName,
                    identifierFieldName: toField?.reference?.identifierFieldName?.join(','),
                    duplicates: _entity?.duplicates || false,
                    createdBy: props.user._id,
                    updatedBy: props.user._id
                };
                data.push(_data);
            }
        });
        try {
            const result = await client.service('dynaFields').create(data);
            console.log(result);
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Create info',
                message: 'Info DynaFields created successfully'
            });
        } catch (error) {
            console.log('error', error);
            setLoading(false);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in DynaFields'
            });
        }
    };

    const onSave = async () => {
        if (!validate()) return;
        let _data = {
            from: _entity?.from?.value,
            to2: _entity?.to2?.value,
            name: `${_entity?.from?.name} => ${_entity?.to2?.name}`,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            const result = await client.service('dynaLoader').create(_data);
            // console.log(result);
            props.onHide();
            props.onCreateResult(result);
            onSaveFields(result);
        } catch (error) {
            console.log('error', error);
            setLoading(false);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to create');
            props.alert({
                type: 'error',
                title: 'Create',
                message: 'Failed to create in DynaLoader'
            });
        } finally {
            setLoading(false);
        }
    };

    const search = (event, label) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filtered = allServicesLimited;

            if (!event.query.trim().length) {
                _filtered = allServicesLimited;
            } else {
                _filtered = allServicesLimited.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            if (label === 'to2' && _entity?.from?.value) {
                _filtered = _filtered.filter((s) => s.value !== _entity?.from?.value);
            }
            setItems(_filtered);
        }, 250);
    };

    const searchFields = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            const allFields = _entity?.from.schemaList?.map((f) => {
                return {
                    name: f.label,
                    value: f.fieldName,
                    type: f.type
                };
            });
            let _filtered;
            if (!event.query.trim().length) {
                _filtered = allFields;
            } else {
                _filtered = allFields?.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            if (_filtered.length === 0) {
                _filtered = allFields?.filter((i) => {
                    return i.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFields(_filtered || [event.query]);
        }, 250);
    };

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const setValByKeyField = (key, val) => {
        let new_entity = { ..._field, [key]: val };
        set_field(new_entity);
        setError({});
    };

    const setValForKeyField = (key, val) => {
        let new_entity = { ..._value, [key]: val };
        set_value(new_entity);
        setError({});
    };

    const sourceField = (fieldName) => {
        return <AutoComplete id="from" key={fieldName} className="p-inputtext-sm" value={_field[fieldName]} suggestions={fields} placeholder={`field for ${fieldName}`} field="name" content="content" completeMethod={searchFields} onChange={(e) => setValByKeyField(fieldName, e.value)} dropdown />;
    };

    const renderDynaLoaderTable = () => {
        if (_.isEmpty(_entity?.from?.value)) return null;
        if (_.isEmpty(_entity?.to2?.value)) return null;

        const fixedValueTemplate = (rowData, { rowIndex }) => {
            switch (rowData.type) {
                case 'String':
                    return <InputText value={_value[rowData.fieldName]} onChange={(e) => setValForKeyField(rowData?.fieldName, e.target.value)} />;
                case 'Boolean':
                    return <Checkbox checked={false} value={_value[rowData.fieldName]} onChange={(e) => setValForKeyField(rowData?.fieldName, e.checked)} />;
                case 'Date':
                    return <Calendar showIcon value={Date.parse(_value[rowData.fieldName]) || new Date()} onChange={(e) => setValForKeyField(rowData?.fieldName, e.value)} />;
                case 'ObjectId':
                    return <label>{`${rowData?.reference.refServiceName} - ${rowData?.reference.identifierFieldName.join(',')}`}</label>;
                default:
                    return null;
            }
        };

        return (
            <DataTable key="dataTable" value={_entity.to2.schemaList} className="w-full">
                <Column header="#" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ minWidth: '2rem' }} />
                <Column field="Type" header="Custom" body={(rowData) => rowData?.type} style={{ minWidth: '8rem' }} />
                <Column field="Type" header="Type" body={(rowData) => _.find(_entity?.from?.schemaList, { fieldName: rowData?.fieldName })?.type} style={{ minWidth: '8rem' }} />
                <Column header={`${_entity?.from?.name} Source field`} body={(rowData) => sourceField(rowData?.fieldName)} style={{ minWidth: '8rem' }} />
                <Column field="fieldName" header="Destination" body={(rowData) => rowData?.fieldName} style={{ minWidth: '8rem' }} />
                <Column field="Type" header="Type" body={(rowData) => rowData?.type} style={{ minWidth: '8rem' }} />
                <Column field="Type" header="Find/Replace with value" body={fixedValueTemplate} style={{ minWidth: '8rem' }} />

                {/* <Column
          field="Type"
          header="Type"
          body={(rowData) => _field[rowData.fieldName]?.type}
          style={{ minWidth: "8rem" }}
        /> */}
            </DataTable>
        );
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    return (
        <Dialog header="DynaLoader for dynamic data transfer" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid no-gutter p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="dynaLoader-create-dialog-component">
                <div className="col-12 md:col-6">
                    <span className="align-items-center">
                        <label htmlFor="from">Source:</label>
                        <AutoComplete id="from" className="w-full mb-3 p-inputtext-sm" value={_entity?.from} suggestions={items} field="name" placeholder="type service name here" completeMethod={search} onChange={(e) => setValByKey('from', e.value)} dropdown />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['from']) ? (
                            <p className="m-0" key="error-from">
                                {error['from']}
                            </p>
                        ) : null}
                    </small>
                </div>
                <div className="col-12 md:col-6">
                    <span className="align-items-center">
                        <label htmlFor="to2">Destination:</label>
                        <AutoComplete id="to2" className="w-full mb-3 p-inputtext-sm" value={_entity?.to2} suggestions={items} field="name" placeholder="type service name here" completeMethod={(e) => search(e, 'to2')} onChange={(e) => setValByKey('to2', e.value)} dropdown />
                    </span>
                    <small className="p-error">
                        {!_.isEmpty(error['to2']) ? (
                            <p className="m-0" key="error-from">
                                {error['to2']}
                            </p>
                        ) : null}
                    </small>
                </div>
                {renderDynaLoaderTable()}
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

export default connect(mapState, mapDispatch)(DynaLoaderCreateDialogComponent);
