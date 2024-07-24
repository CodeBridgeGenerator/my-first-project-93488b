import React, { useEffect, useState } from 'react';
import { classNames } from 'primereact/utils';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import GoogleOauth from './GoogleOauth';
import FacebookOauth from './FacebookOauth';
import GithubOauth from './GithubOauth';
import AppleOauth from './AppleOauth';
// import { deviceDetect } from "react-device-detect";
const SignUpPage = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [maskPassword, setMaskPassword] = useState(true);
    const navigate = useNavigate();
    const isSignup = /signup/.test(location.pathname);

    useEffect(() => {
        if (props.isLoggedIn === true) navigate('/user/studio');
    }, [props.isLoggedIn]);

    const onEnter = (e) => {
        if (e.key === 'Enter') signup();
    };

    const signup = () => {
        if (validate()) {
            props.createUser({ name, email, password }).then((res) => {
                navigate('/login');
            });
        }
    };

    const validate = () => {
        let isValid = true;
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
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

        return isValid;
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
                        <h4>Sign Up</h4>
                        <div className="col-12 lg:col-8">
                            <p className="m-0">Name</p>
                            <InputText
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameError(null);
                                }}
                                className={nameError ? 'p-invalid' : ''}
                                onKeyDown={onEnter}
                            ></InputText>
                            <small className="p-error">{nameError}</small>
                        </div>
                        <div className="col-12 lg:col-8">
                            <p className="m-0">Email</p>
                            <InputText
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(null);
                                }}
                                className={emailError ? 'p-invalid' : ''}
                                onKeyDown={onEnter}
                            ></InputText>
                            <small className="p-error">{emailError}</small>
                        </div>
                        <div className="col-12 lg:col-8">
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
                            {renderPasswordPolicyErrors()}
                        </div>
                    </div>
                    <div className="flex justify-content-center mt-3">
                        <div className="col-6 lg:col-6">
                            <Button label="Sign Up" className="p-button-raised p-button-rounded" onClick={signup}></Button>
                        </div>
                    </div>
                    {/* <div className="flex flex-column align-items-center mt-3">
                        <div className="col-12 lg:col-8">
                            <div className="flex">
                                <p className="m-0">Or Signup with</p>
                                <hr
                                    style={{
                                        width: '60%',
                                        marginLeft: '5%',
                                        marginTop: '3%',
                                        borderTop: '1px solid #000'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-12 lg:col-8">
                            <GoogleOauth props={props} type={'signup'} />
                        </div>
                        <div className="col-12 lg:col-8">
                            <FacebookOauth props={props} type={'signup'} />
                        </div>
                        <div className="col-12 lg:col-8">
                            <GithubOauth props={props} type={'signup'} />
                        </div>
                        <div className="col-12 lg:col-8">
                            <AppleOauth props={props} type={'signup'} />
                        </div>
                    </div> */}
                </div>
            </div>
            <div style={{ height: '100px' }} />
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

export default connect(mapState, mapDispatch)(SignUpPage);
