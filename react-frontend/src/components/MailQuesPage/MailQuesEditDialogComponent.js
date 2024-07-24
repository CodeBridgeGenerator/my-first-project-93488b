import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import client from '../../services/restClient';
import _ from 'lodash';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

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

const MailQuesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    const onSave = async () => {
        let _data = {
            subject: _entity?.subject,
            end: _entity?.end
        };

        setLoading(true);
        try {
            const result = await client.service('mailQues').patch(_entity._id, _data);
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Edit info',
                message: 'Info mailQues updated successfully'
            });
            props.onEditResult(result);
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
        <Dialog header="Edit MailQuest" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto" style={{ maxWidth: '55vw' }} role="mailQues-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="subject">Subject:</label>
                        <InputTextarea id="subject" rows={5} cols={30} value={_entity?.subject} onChange={(e) => setValByKey('subject', e.target.value)} autoResize required />
                    </span>
                </div>
                <div className="col-12 md:col-6 field mt-5">
                    <span className="align-items-center">
                        <label htmlFor="end">End:</label>
                        <Calendar id="end" value={_entity?.end ? new Date(_entity?.end) : new Date()} onChange={(e) => setValByKey('end', new Date(e.target.value))} showIcon showButtonBar />
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
                        <Tag value="last Updated At:"></Tag>
                        {' ' + moment(_entity?.updatedAt).fromNow()}
                    </p>
                </div>
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

export default connect(mapState, mapDispatch)(MailQuesCreateDialogComponent);
