import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const AccountChangeName = (props) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [_entity, set_entity] = useState({});

    useEffect(() => {
        set_entity({ name: props.user.name });
    }, []);

    const onSave = async () => {
        let _data = {
            name: _entity.name
        };

        setLoading(true);
        props.patchUser(props.user._id, _data).then(
            (resp) => {
                setLoading(false);
            },
            (error) => {
                setLoading(false);
                console.error(error.message);
            }
        );
    };

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError('');
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    return (
        <Dialog header="Change Name" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div>
                    <p className="m-0">New Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey('name', e.target.value)} />
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
    const { user } = state.auth;
    return { user };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    patchUser: (data) => dispatch.auth.patchUser(data)
});

export default connect(mapState, mapDispatch)(AccountChangeName);
