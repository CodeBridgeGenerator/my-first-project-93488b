import React, { useState } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import seederData from './userInvites.seeder.json';
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

const UserInvitesSeederDialogComponent = (props) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onRun = async () => {
        if (!seederData.length) return;
        setError('');
        let results = [];
        setLoading(true);
        try {
            for (let i = 0; i < seederData.length; i++) {
                let _data = seederData[i];
                _data['createdBy'] = props.user._id;
                _data['updatedBy'] = props.user._id;
                const res = await client.service('userInvites').create(_data);
                results = [...results, res];
            }
            props.onHide();
            props.alert({
                type: 'success',
                title: 'Seeder',
                message: 'Seeder ran successfully'
            });
            props.onSeederResults(results);
        } catch (error) {
            console.log('error', error);
            setError(getSchemaValidationErrorsStrings(error) || 'Failed to run seeder');
            props.alert({
                type: 'error',
                title: 'Seeder',
                message: 'Failed to run seeder'
            });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="run" className="p-button-text no-focus-effect" onClick={onRun} loading={loading} disabled={!seederData.length} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    return (
        <Dialog header="Seeder" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div className="w-full">
                    {!Array.isArray(error) ? (
                        <pre>{JSON.stringify(seederData, null, 2)}</pre>
                    ) : (
                        <div>
                            <h4>Error Found</h4>
                        </div>
                    )}
                </div>

                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(UserInvitesSeederDialogComponent);
