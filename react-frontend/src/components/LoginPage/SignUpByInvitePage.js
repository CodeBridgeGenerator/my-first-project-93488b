import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { InputOtp } from 'primereact/inputotp';
import client from '../../services/restClient';
import _ from 'lodash';

const SignUpByInvitePage = (props) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailInvites, setUserEmailInvites] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [isVerified, setVerified] = useState(false);
    const [code, setCode] = useState();
    const [codeError, setCodeError] = useState('');
    const [genCode, setGenCode] = useState();
    const [passwordError, setPasswordError] = useState(null);
    const [maskPassword, setMaskPassword] = useState(true);
    const navigate = useNavigate();
    const isSignup = /signup/.test(location.pathname);

    useEffect(() => {
        _get();
    }, []);

    const _get = async () => {
        let data = await client.service('userInvites').find({
            query: {
                $sort: {
                    emailToInvite: 1
                }
            }
        });
        setUserEmailInvites(data.data);
        setSelectedEmails(data.data);
    };

    const _getEmail = async () => {
        return await client.service('userInvites').find({
            query: {
                emailToInvite: email.emailToInvite
            }
        });
    };

    const _setCode = async (id, code) => {
        return await client.service('userInvites').patch(id, {
            code
        });
    };

    const _setCounter = async (id, count) => {
        return await client.service('userInvites').patch(id, {
            sendMailCounter: count
        });
    };

    const onEnter = (e) => {
        if (e.key === 'Enter') signup();
    };

    const verify = () => {
        if (Number(code) === Number(genCode) || Number(code) === Number(email?.code)) {
            setVerified(true);
            props.alert({
                title: 'Verification successful.',
                type: 'success',
                message: 'Proceed to create your account.'
            });
        } else {
            setCodeError('Code verification failed');
            props.alert({
                title: 'Verification failed.',
                type: 'error',
                message: 'Proceed to contact admin.'
            });
        }
    };

    const validate = () => {
        let isValid = true;
        if (!email.emailToInvite) {
            setEmailError('Please Enter a valid email');
            isValid = false;
        }

        if (!name.length) {
            setNameError('name is required');
            isValid = false;
        } else if (name.length < 3) {
            setNameError('Must be at least 3 characters long');
            isValid = false;
        }
        if (!password.length) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Must be at least 6 characters long and have at least one letter, digit, uppercase, lowercase and symbol');
            isValid = false;
        }

        if (password !== confirmPassword) {
            setPasswordError('Confirm Password is not correct');
            isValid = false;
        }

        return isValid;
    };

    const signup = () => {
        if (validate()) {
            try {
                props
                    .createUser({
                        name,
                        email: email?.emailToInvite,
                        password,
                        status: true
                    })
                    .then(async () => {
                        await client.service('userLogin').create({ loginEmail: email?.emailToInvite });
                        navigate('/login');
                    });
                props.alert({
                    title: 'User account created successfully.',
                    type: 'success',
                    message: 'Proceed to login.'
                });
            } catch (error) {
                if (error.message === 'email: value already exists.') {
                    client.service('userLogin').create({ loginEmail: email?.emailToInvite });
                    navigate('/login');
                    props.alert({
                        title: 'User account already exists.',
                        type: 'success',
                        message: 'Proceed to login.'
                    });
                } else {
                    props.alert({
                        title: 'User account failed to create.',
                        type: 'error',
                        message: error.message || 'Failed to sign in.'
                    });
                }
            }
        } else {
            props.alert({
                title: 'Sign up failed.',
                type: 'error',
                message: 'Please contact admin.'
            });
            return;
        }
    };

    const validateEmailSending = () => {
        if (!email) {
            props.alert({
                title: 'Email not selected',
                type: 'error',
                message: 'Proceed to contact admin.'
            });
            return false;
        }
        return true;
    };

    const validateEmailInvite = (userInvite) => {
        if (!userInvite) {
            props.alert({
                title: 'User invitation not found.',
                type: 'error',
                message: 'Proceed to contact admin.'
            });
            return false;
        }
        return true;
    };

    const validateEmailSentCount = (userInvite) => {
        if (userInvite.sendMailCounter > 3) {
            props.alert({
                title: 'Too many retries',
                type: 'error',
                message: 'Proceed to contact admin.'
            });
            return false;
        }
        return true;
    };

    const resendMail = async () => {
        let _code;
        if (!validateEmailSending()) return;
        const userInviteData = await _getEmail();
        const userInvite = userInviteData.data[0];
        console.log(userInvite);
        if (!validateEmailInvite(userInvite)) return;
        if (!validateEmailSentCount(userInvite)) return;

        if (userInvite?.code) {
            _code = userInvite?.code;
            setGenCode(userInvite?.code);
        } else if (email?.code) {
            _code = email?.code;
            setGenCode(email?.code);
        } else {
            _code = codeGen();
            setGenCode(_code);
            await _setCode(email?._id, _code);
        }

        const _mail = {
            name: 'onCodeVerifyEmail',
            type: 'signup',
            from: 'info@cloudbasha.com',
            recipients: [email?.emailToInvite],
            status: true,
            data: { name: name, code: _code },
            subject: 'signup verify processing',
            templateId: 'onCodeVerify'
        };
        setLoading(true);
        await client.service('mailQues').create(_mail);
        props.alert({
            title: 'Verification email sent.',
            type: 'success',
            message: 'Proceed to check your email inbox.'
        });
        _setCounter(userInvite._id, userInvite.sendMailCounter++);
        setLoading(false);
    };

    const codeGen = () => {
        return Math.floor(Math.random() * 999999);
    };

    const search = (event) => {
        setSelectedEmails(_.filter(emailInvites, (item) => item.emailToInvite.indexOf(event.query) > -1));
    };

    const customInput = ({ events, props }) => {
        return (
            <>
                <input {...events} {...props} type="number" className="custom-otp-input-sample" />
                {props.id === 2 && (
                    // <div className="px-3">
                    <i className="pi pi-minus p-0 ml-2 mr-2" />
                    // </div>
                )}
            </>
        );
    };

    const inputOTP = () => {
        return (
            <div className="w-full">
                <style scoped>
                    {`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }
                `}
                </style>
                <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                <p className="text-color-secondary block mb-5">Please enter the code sent to your email.</p>
                <InputOtp value={code} onChange={(e) => setCode(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                <small className="p-error">{codeError}</small>
                <div className="flex justify-content-between mt-5 align-self-stretch">
                    <Button label="Resend Code" loading={loading} link className="p-0" onClick={resendMail}></Button>
                    <Button label="Submit Code" loading={loading} onClick={verify}></Button>
                </div>
            </div>
        );
    };

    const renderPasswordPolicyErrors = () => {
        const { passwordPolicyErrors } = props;
        if (!(Array.isArray(passwordPolicyErrors) && passwordPolicyErrors.length)) return null;
        return passwordPolicyErrors.map((message, i) => {
            return (
                <p className="m-0" key={'pass-policy-' + i}>
                    <small className="p-error">{message}</small>
                </p>
            );
        });
    };

    return (
        <div className="grid p-fluid flex flex-column align-items-center h-screen">
            <div
                className={classNames('col-12 lg:col-5 px-6', {
                    'mt-8 pt-8': isSignup
                })}
            >
                <div className="card">
                    <div>
                        <p>
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                    <div style={{ height: '20px' }} />
                    <div className="flex flex-column align-items-center">
                        <h4>Sign Up By Invitation</h4>
                        <div className="col-12 lg:col-8">
                            <p className="m-0">Email</p>
                            <AutoComplete
                                type="text"
                                field="emailToInvite"
                                placeholder="Choose your email"
                                value={email}
                                suggestions={selectedEmails}
                                completeMethod={search}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(null);
                                }}
                                disabled={isVerified}
                                className={emailError ? 'p-invalid' : ''}
                                onKeyDown={onEnter}
                            ></AutoComplete>
                            <small className="p-error">{emailError}</small>
                        </div>
                        <div className="col-12 lg:col-8">
                            <p className="m-0">Name</p>
                            <InputText
                                type="text"
                                placeholder="How can I address you?"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError(null);
                                }}
                                disabled={isVerified}
                                className={nameError ? 'p-invalid' : ''}
                                onKeyDown={onEnter}
                            ></InputText>
                            <small className="p-error">{nameError}</small>
                        </div>

                        <div className={classNames('col-12 lg:col-8', { hidden: !isVerified })}>
                            <p className="m-0">Password</p>
                            <span className="p-input-icon-right">
                                <i className={`pi ${maskPassword ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`} onClick={() => setMaskPassword(!maskPassword)} title={`${maskPassword ? 'Show' : 'Hide'} password`} />
                                <InputText
                                    type={maskPassword ? 'password' : 'text'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(null);
                                    }}
                                    className={passwordError ? 'p-invalid' : ''}
                                    onKeyDown={onEnter}
                                ></InputText>
                            </span>
                            <small className="p-error">{passwordError}</small>
                        </div>
                        <div className={classNames('col-12 lg:col-8', { hidden: !isVerified })}>
                            <p className="m-0">Confirm Password</p>
                            <span className="p-input-icon-right">
                                <i className={`pi ${maskPassword ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`} onClick={() => setMaskPassword(!maskPassword)} title={`${maskPassword ? 'Show' : 'Hide'} password`} />
                                <InputText
                                    type={maskPassword ? 'password' : 'text'}
                                    placeholder="Enter your confirmed password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setPasswordError(null);
                                    }}
                                    className={passwordError ? 'p-invalid' : ''}
                                    onKeyDown={onEnter}
                                ></InputText>
                            </span>
                            <small className="p-error">{passwordError}</small>
                            {renderPasswordPolicyErrors()}
                        </div>
                    </div>
                    <div className="card flex justify-content-center mt-3">
                        <div className={classNames('col-6 lg:col-6', { hidden: !isVerified })}>
                            <Button label="Sign Up" className="p-button-raised p-button-rounded" onClick={signup}></Button>
                        </div>
                        <div className={classNames('col-12 lg:col-10', { hidden: isVerified })}>{inputOTP()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { isLoggedIn, passwordPolicyErrors } = state.auth;
    return { isLoggedIn, passwordPolicyErrors };
};
const mapDispatch = (dispatch) => ({
    createUser: (data) => dispatch.auth.createUser(data),
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(SignUpByInvitePage);
