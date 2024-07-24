import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import FacebookOauth from './FacebookOauth';
import GithubOauth from './GithubOauth';
import GoogleOauth from './GoogleOauth';
import AppleOauth from './AppleOauth';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [maskPassword, setMaskPassword] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = /login/.test(location.pathname);

    useEffect(() => {
        if (props.isLoggedIn === true) navigate('/', { replace: true });
    }, [props.isLoggedIn]);

    const onEnter = (e) => {
        if (e.key === 'Enter') login();
    };

    const login = () => {
        if (validate()) {
            props
                .login({ email, password })
                .then((loginResponse) => {
                    navigate('/project');
                    client
                        .service('userLogin')
                        .find({ query: { emailLogin: email } })
                        .then((userLogin) => {
                            client.service('userLogin').patch(userLogin?.data[0]?._id, {
                                access: loginResponse?.accessToken
                            });
                        });
                })
                .catch((error) => {
                    props.alert({
                        title: 'User Login tracking failed.',
                        type: 'error',
                        message: error.message || 'Proceed to login to your account.'
                    });
                });
        }
    };

    const validate = () => {
        let isValid = true;
        let re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setEmailError('Please Enter a valid Email address');
            isValid = false;
        }
        if (password.length < 6) {
            setPasswordError('Please enter a valid password. Must be at least 6 characters');
            isValid = false;
        }
        return isValid;
    };

    return (
        <div className={classNames('grid p-fluid flex flex-column align-items-center mt-8', { 'h-screen': isLogin })}>
            <div className={classNames({ 'col-12 lg:col-6 xl:col-4': isLogin })}>
                <div className="card flex flex-column align-items-center">
                    <div
                        className={classNames('flex flex-column align-items-center', {
                            'grid col-12 xl:col-8 ': isLogin
                        })}
                    >
                        <h4>Login</h4>
                        <div className="w-full mb-4">
                            <p className="m-0">Email</p>
                            <InputText type="text" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={emailError ? 'p-invalid' : ''} onKeyDown={onEnter}></InputText>
                            <small className="p-error">{emailError}</small>
                        </div>
                        <div className="w-full mb-4">
                            <p className="m-0">Password</p>
                            <span className="p-input-icon-right">
                                <i className={`pi ${maskPassword ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`} onClick={() => setMaskPassword(!maskPassword)} title={`${maskPassword ? 'Show' : 'Hide'} password`} />
                                <InputText type={maskPassword ? 'password' : 'text'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={passwordError ? 'p-invalid' : ''} onKeyDown={onEnter}></InputText>
                            </span>
                            <small className="p-error">{passwordError}</small>
                        </div>
                        <div className="w-6 mb-4">
                            <Button label="Login" className="p-button-raised p-button-rounded" onClick={login}></Button>
                        </div>
                        {/* <div className="w-full mb-4">
                            <div className="flex">
                                <p className="m-0">Or login with</p>
                                <hr
                                    style={{
                                        width: '60%',
                                        marginLeft: '5%',
                                        marginTop: '4%',
                                        borderTop: '1px solid #000'
                                    }}
                                />
                            </div>
                            <div className="w-full flex justify-content-center mt-3">
                                <GoogleOauth props={props} type={'login'} />
                            </div>
                            <div className="w-full flex justify-content-center mt-3">
                                <FacebookOauth props={props} type={'login'} />
                            </div>
                            <div className="w-full flex justify-content-center mt-3">
                                <GithubOauth props={props} type={'login'} />
                            </div>
                            <div className="w-full flex justify-content-center mt-3">
                                <AppleOauth props={props} type={'login'} />
                            </div>
                        </div> */}
                        <div className="w-full flex flex-column align-items-center">
                            <div className="w-full flex justify-content-between">
                                <Link to="/signup">Don't have an account?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    login: (data) => dispatch.auth.login(data),
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(LoginPage);
