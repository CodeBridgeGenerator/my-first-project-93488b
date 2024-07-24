import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import LoginPage from '../LoginPage/LoginPage';

const Dashboard = (props) => {
    useEffect(() => {}, []);
    const url = process.env.REACT_APP_SERVER_URL;
    return (
        <div
            className="col-12 flex flex-column align-items-center"
            style={{
                background: 'url("/assets/images/blocks/signin/signin.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 1600
            }}
        >
            <div className="flex w-10">
                <div className="w-8 mt-8">
                    <h3 className="ml-8">App is ready</h3>
                    <div className="w-full flex justify-content-center flex-wrap ">
                        <div className="col-12 lg:col-6 xl:col-6">
                            <Link to="/todo">
                                <div className="mb-0 flex flex-column align-items-center justify-content-center hover zoom">
                                    <div className="shadow-2 border-round surface-card mb-3 h-full flex-column justify-content-between flex">
                                        <div className="p-4">
                                            <div className="flex align-items-center">
                                                <span className="inline-flex border-circle align-items-center justify-content-center bg-yellow-100 mr-3" style={{ width: '38px', height: '38px' }}>
                                                    <i className="pi pi-briefcase text-xl text-yellow-600"></i>
                                                </span>
                                                <span className="text-900 font-medium text-2xl">Get Started</span>
                                            </div>
                                            <div className="text-900 my-3 text-xl font-medium">Unlimited user access</div>
                                            <p className="mt-0 mb-3 text-700 line-height-3">User access levels: Super-user, Manager, Supervisor, Technician, External.</p>
                                        </div>
                                        <div className="px-4 py-3 surface-100 text-right">
                                            <Button icon="pi pi-arrow-right" label="Get Started" className="p-button-rounded p-button-warning" iconPos="right" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 lg:col-6 xl:col-6">
                            <Link to="/admin">
                                <div className="mb-0 flex flex-column align-items-center justify-content-center hover zoom">
                                    <div className="shadow-2 border-round surface-card mb-3 h-full flex-column justify-content-between flex">
                                        <div className="p-4">
                                            <div className="flex align-items-center">
                                                <span className="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3" style={{ width: '38px', height: '38px' }}>
                                                    <i className="pi pi-globe text-xl text-green-600"></i>
                                                </span>
                                                <span className="text-900 font-medium text-2xl">Dashboards</span>
                                            </div>
                                            <div className="text-900 my-3 text-xl font-medium">Real Time Tracking</div>
                                            <p className="mt-0 mb-3 text-700 line-height-3">Tracking on manhours, Reports on job status, Status of machine, Generate quote.</p>
                                        </div>
                                        <div className="px-4 py-3 surface-100 text-right">
                                            <Button icon="pi pi-arrow-right" label="Reports" className="p-button-rounded p-button-success" iconPos="right" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Links to services */}
                        {/* ~cb-add-services-card~ */}
                    </div>
                </div>
                <div className="w-4 flex flex-column align-items-center zoomindown animation-duration-1000 animation-iteration-1">
                    <p className="text-7xl m-0" role="welcome-text">
                        Welcome!
                    </p>
                    <p>You are ready to go!</p>
                    {props.isLoggedIn ? null : <LoginPage />}
                </div>
            </div>
            <div className="card w-10 my-6">
                <div className="surface-0">
                    <div className="font-medium text-3xl text-900 mb-3">Login Information</div>
                    <div className="text-500 mb-5">Each company employs a distinct login and authentication method. Below are the available methods for this application. For further details, please contact support.</div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Email Invitation</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Did you recevie and email? Please follow the link to login or contact support?</div>
                            <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Support" icon="pi pi-question-circle" className="p-button-text" />
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Simple Sign Up</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                <Chip label="Default as Staff profile" className="mr-2" />
                                <Chip label="No Department or section" className="mr-2" />
                                <Chip label="Must wait for approval from Admin" />
                            </div>
                            <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Support" icon="pi pi-question-circle" className="p-button-text" />
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Admin</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Please use your codebridge account to login for admin functions only</div>
                            <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Support" icon="pi pi-question-circle" className="p-button-text" />
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                            <div className="text-500 w-6 md:w-2 font-medium">Other Actors</div>
                            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Robert De Niro, Al Pacino, etc have to request access from support.</div>
                            <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Support" icon="pi pi-question-circle" className="p-button-text" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(Dashboard);
