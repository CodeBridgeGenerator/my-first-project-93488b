import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const AccountChangePassword = (props) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [_entity, set_entity] = useState({});
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);

    const [maskOldPassword, setMaskOldPassword] = useState(true);
    const [maskNewPassword, setMaskNewPassword] = useState(true);
    const [maskConfirmNewPassword, setMaskConfirmNewPassword] = useState(true);

    useEffect(() => {
        set_entity(props.entity);
        reset();
    }, [props.entity, props.show]);

    const renderPasswordPolicyErrors = () => {
        if (!(Array.isArray(props.passwordPolicyErrors) && props.passwordPolicyErrors.length)) return null;
        return props.passwordPolicyErrors.map((message, i) => {
            return (
                <p className="m-0" key={'pass-policy-' + i}>
                    <small className="p-error">{message}</small>
                </p>
            );
        });
    };
    const reset = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setOldPasswordError(null);
        setNewPasswordError(null);
        setConfirmNewPasswordError(null);

        setMaskOldPassword(true);
        setMaskNewPassword(true);
        setMaskConfirmNewPassword(true);
    };

    const onSubmit = () => {
        if (!validate()) return;

        props.changeUserPassword({ oldPassword, newPassword }).then((res) => {
            props.onHide;
            props.logout();
        });
    };

    const validate = () => {
        let isValid = true;

        if (oldPassword.length < 6) {
            setOldPasswordError('Must be at least 6 characters long');
            isValid = false;
        }

        if (newPassword.length < 6) {
            setNewPasswordError('Must be at least 6 characters long');
            isValid = false;
        }

        if (confirmNewPassword.length < 6) {
            setConfirmNewPasswordError('Must be at least 6 characters long');
            isValid = false;
        }

        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("'Confirm New Password' does not match 'New Password'");
            isValid = false;
        }

        if (newPassword === oldPassword) {
            if (!newPasswordError) {
                setNewPasswordError('New Password and Old Password must be different');
                isValid = false;
            }
        }

        return isValid;
    };

    const renderFooter = () => (
        <div className="grid">
            <div className="col-6 flex justify-content-start">
                <Button label="reset" className="p-button-text no-focus-effect" onClick={reset} loading={loading} />
            </div>
            <div className="col-6 flex justify-content-end">
                <Button label="save" className="p-button-text no-focus-effect" onClick={onSubmit} loading={loading} />
                <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
            </div>
        </div>
    );

    return (
        <Dialog header="Change Password" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid flex flex-column align-items-center p-fluid mt-3">
                <div className="col-12 lg:col-8">
                    <p className="m-0">Old Password</p>
                    <span className="p-input-icon-right ">
                        <i className={`pi ${maskOldPassword ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`} onClick={() => setMaskOldPassword(!maskOldPassword)} title={`${maskOldPassword ? 'Show' : 'Hide'} password`} />
                        <InputText
                            type={maskOldPassword ? 'password' : 'text'}
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) => {
                                setOldPassword(e.target.value);
                                setOldPasswordError(null);
                            }}
                            className={`${oldPasswordError ? 'p-invalid' : ''} `}
                        ></InputText>
                    </span>
                    <small className="p-error">{oldPasswordError}</small>
                </div>
                <div className="col-12 lg:col-8">
                    <p className="m-0">New Password</p>
                    <span className="p-input-icon-right">
                        {/* <i className={`pi ${maskNewPassword ? "pi-eye" : "pi-eye-slash"} cursor-pointer`} onClick={() => setMaskNewPassword(!maskNewPassword)} title={`${maskNewPassword ? "Show" : "Hide"} password`} /> */}
                        <InputText
                            type={maskNewPassword ? 'password' : 'text'}
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setNewPasswordError(null);
                            }}
                            className={newPasswordError ? 'p-invalid' : ''}
                        ></InputText>
                    </span>
                    <small className="p-error">{newPasswordError}</small>
                </div>
                <div className="col-12 lg:col-8">
                    <p className="m-0">Confirm New Password</p>
                    <span className="p-input-icon-right">
                        {/* <i className={`pi ${maskConfirmNewPassword ? "pi-eye" : "pi-eye-slash"} cursor-pointer`} onClick={() => setMaskConfirmNewPassword(!maskConfirmNewPassword)} title={`${maskConfirmNewPassword ? "Show" : "Hide"} password`} /> */}
                        <InputText
                            type={maskConfirmNewPassword ? 'password' : 'text'}
                            placeholder="Enter your new password again"
                            value={confirmNewPassword}
                            onChange={(e) => {
                                setConfirmNewPassword(e.target.value);
                                setConfirmNewPasswordError(null);
                            }}
                            className={confirmNewPasswordError ? 'p-invalid' : ''}
                        ></InputText>
                    </span>
                    <small className="p-error">{confirmNewPasswordError}</small>
                    {renderPasswordPolicyErrors()}
                </div>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user, passwordPolicyErrors } = state.auth;
    return { user, passwordPolicyErrors };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    changeUserPassword: (data) => dispatch.auth.changeUserPassword(data),
    logout: () => dispatch.auth.logout()
});

export default connect(mapState, mapDispatch)(AccountChangePassword);
