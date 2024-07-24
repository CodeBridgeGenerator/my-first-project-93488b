import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import DynamicDashboards from './DynamicDashboards';
import CommandMenu from '../CommandCenter';

const AdminDashLayout = (props) => {
    const navigate = useNavigate();

    const btnRef9 = useRef(null);
    const btnRef10 = useRef(null);
    const btnRef11 = useRef(null);

    const [activeTab, setActiveTab] = useState(null);
    const [activeTab2, setActiveTab2] = useState(null);
    const [activeChild, setActiveChild] = useState(null);

    useEffect(() => {
        const lastActiveTab = Number(localStorage.getItem('currentActiveTab1')) || 0;

        const lastActiveTab2 = Number(localStorage.getItem('currentActiveTab2')) || null;
        console.log(activeTab, activeTab2, lastActiveTab);

        if (!activeTab) {
            setActiveTab(lastActiveTab);
        }

        if (!activeTab2) {
            setActiveTab2(lastActiveTab2);
        } else if (activeTab !== lastActiveTab) setActiveTab2(null);
    }, []);

    const setCurrentActiveTab1 = (tab1) => {
        localStorage.setItem('currentActiveTab1', tab1);
        setActiveTab(tab1);
    };

    const setCurrentActiveTab2 = (tab2) => {
        localStorage.setItem('currentActiveTab2', tab2);
        setActiveTab2(tab2);
    };

    return (
        <>
            <div className="flex relative lg:static surface-0" style={{ minHeight: '90vh' }}>
                <div id="app-sidebar" className="h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-full md:w-auto">
                    <div className="flex h-full">
                        <div className="flex flex-column h-full bg-yellow-600 flex-shrink-0 select-none">
                            <div className="flex align-items-center justify-content-center flex-shrink-0">
                                {/* <Button
                  icon="pi pi-home"
                  rounded
                  style={{ color: "white" }}
                  outlined
                  aria-label="Cancel"
                  onClick={() => navigate("/")}
                /> */}
                            </div>
                            <div className="overflow-y-auto mt-3">
                                <ul className="list-none py-3 pl-2 pr-0 m-0">
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-yellow-600 text-yellow-100 hover:text-yellow-50 transition-duration-150 transition-colors', { 'bg-white': activeTab === 0 })}
                                            onClick={() => {
                                                setCurrentActiveTab1(0);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i className="pi pi-building text-xl" style={{ color: activeTab === 0 ? 'black' : 'white' }}></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-yellow-600 text-yellow-100 hover:text-yellow-50 transition-duration-150 transition-colors', { 'bg-white': activeTab === 1 })}
                                            onClick={() => {
                                                setCurrentActiveTab1(1);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i className="pi pi-objects-column text-xl" style={{ color: activeTab === 1 ? 'black' : 'white' }}></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-yellow-600 text-yellow-100 hover:text-yellow-50 transition-duration-150 transition-colors', { 'bg-white': activeTab === 2 })}
                                            onClick={() => {
                                                setCurrentActiveTab1(2);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i className="pi pi-users text-xl" style={{ color: activeTab === 2 ? 'black' : 'white' }}></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-yellow-600 text-yellow-100 hover:text-yellow-50 transition-duration-150 transition-colors', { 'bg-white': activeTab === 3 })}
                                            onClick={() => {
                                                setCurrentActiveTab1(3);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i className="pi pi-comments text-xl" style={{ color: activeTab === 3 ? 'black' : 'white' }}></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-auto">
                                <hr className="mb-3 mx-2 border-top-1 border-none border-yellow-300" />
                                <a
                                    className="p-ripple m-3 flex align-items-center cursor-pointer p-2 justify-content-center hover:bg-yellow-600 border-round text-300 hover:text-0
            transition-duration-150 transition-colors"
                                >
                                    <img src="/assets/images/blocks/avatars/circle/avatar-f-1.png" style={{ width: '24px', height: '24px' }} alt="avatar-f-1" />
                                    <Ripple />
                                </a>
                            </div>
                        </div>
                        <div className={classNames('flex flex-column bg-white p-4 overflow-y-auto flex-shrink-0 flex-grow-1 md:flex-grow-0')} style={{ width: '300px', maxHeight: '100vh' }}>
                            <div className="justify-content-end mb-3 flex lg:hidden">
                                <StyleClass nodeRef={btnRef9} selector="#app-sidebar" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft">
                                    <button
                                        ref={btnRef9}
                                        icon="pi pi-times"
                                        className="p-ripple cursor-pointer text-white appearance-none bg-transparent border-none inline-flex justify-content-center align-items-center border-circle hover:bg-yellow-600 transition-duration-150 transition-colors"
                                        style={{ width: '2rem', height: '2rem' }}
                                    >
                                        <i className="pi pi-times text-xl text-yellow-100" style={{ color: activeTab === 0 ? 'black' : 'white' }}></i>
                                        <Ripple />
                                    </button>
                                </StyleClass>
                            </div>
                            <div className={classNames('border-round flex-auto')}>
                                <div className={classNames({ hidden: activeTab !== 0 })}>
                                    <div className="p-3 font-medium text-2xl mb-5">Dashboards</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2(0);
                                                setActiveChild('hCMasterForm');
                                                navigate('/hCMasterForm');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 0
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 0 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 0,
                                                        'text-black': activeTab2 !== 0
                                                    })}
                                                >
                                                    Hot & Cold
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 0,
                                                        'text-yellow-700': activeTab2 !== 0
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                        {/* ~cb-add-services-card~ */}
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: activeTab !== 1
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Data Management</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setActiveTab2(0);
                                                navigate('/machineMaster');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 0
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-spinner-dotted text-xl mr-3 " style={{ color: activeTab2 !== 0 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 0,
                                                        'text-black': activeTab2 !== 0
                                                    })}
                                                >
                                                    Machines{' '}
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 0,
                                                        'text-yellow-700': activeTab2 !== 0
                                                    })}
                                                >
                                                    Convenient snacks and drinks at the push of a button.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setActiveTab2(1);
                                                navigate('/locationMaster');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 1
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-map-marker text-xl mr-3 " style={{ color: activeTab2 !== 1 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 1,
                                                        'text-black': activeTab2 !== 1
                                                    })}
                                                >
                                                    {' '}
                                                    Locations
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 1,
                                                        'text-yellow-700': activeTab2 !== 1
                                                    })}
                                                >
                                                    Campuses, malls, offices: vending machines cater everywhere's cravings.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setActiveTab2(2);
                                                navigate('/opsCentre');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 2
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-warehouse text-xl mr-3 " style={{ color: activeTab2 !== 2 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 2,
                                                        'text-black': activeTab2 !== 2
                                                    })}
                                                >
                                                    Ops Centres
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 2,
                                                        'text-yellow-700': activeTab2 !== 2
                                                    })}
                                                >
                                                    Vending operators monitor, restock, and maintain machines for seamless service.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: activeTab !== 2
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">User Management</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => setActiveTab2(0)}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 0
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 0 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 0,
                                                        'text-black': activeTab2 !== 0
                                                    })}
                                                >
                                                    Users{' '}
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 0,
                                                        'text-yellow-700': activeTab2 !== 0
                                                    })}
                                                >
                                                    Users interact, admins manage, both uphold application integrity.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => setActiveTab2(1)}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 1
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 1 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 1,
                                                        'text-black': activeTab2 !== 1
                                                    })}
                                                >
                                                    Profiles
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 1,
                                                        'text-yellow-700': activeTab2 !== 1
                                                    })}
                                                >
                                                    User profiles store individual preferences, data, and authentication details.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => setActiveTab2(2)}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 2
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 2 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 2,
                                                        'text-black': activeTab2 !== 2
                                                    })}
                                                >
                                                    User Invites
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 2,
                                                        'text-yellow-700': activeTab2 !== 2
                                                    })}
                                                >
                                                    External users invited, managed through secure registration and authentication.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => setActiveTab2(3)}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-yellow-700': activeTab2 === 3
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 3 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 3,
                                                        'text-black': activeTab2 !== 3
                                                    })}
                                                >
                                                    Roles Positions
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 3,
                                                        'text-yellow-700': activeTab2 !== 3
                                                    })}
                                                >
                                                    Roles dictate access, positions define hierarchy; both manage application functionality.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: activeTab !== 3
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Messages</div>
                                    <ul className="list-none p-0 m-0">
                                        <li className="mb-3 flex align-items-start bg-yellow-700 p-3" style={{ borderRadius: '12px' }}>
                                            <i className="pi pi-user text-xl mr-3 " style={{ color: activeTab2 !== 0 ? 'black' : 'white' }}></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': activeTab2 === 0,
                                                        'text-black': activeTab2 !== 0
                                                    })}
                                                >
                                                    Account
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-yellow-500': activeTab2 === 0,
                                                        'text-yellow-700': activeTab2 !== 0
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen flex flex-column relative flex-auto overlay-div">
                    <div className="flex justify-content-between lg:justify-content-start align-items-center px-5 surface-section border-bottom-1 surface-border relative lg:static" style={{ height: '60px' }}>
                        <div className="flex">
                            <StyleClass nodeRef={btnRef10} selector="#app-sidebar" enterClassName="hidden" enterActiveClassName="fadeinleft" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft">
                                <a ref={btnRef10} className="p-ripple cursor-pointer block lg:hidden text-700 mr-3">
                                    <i className="pi pi-bars text-4xl" style={{ color: activeTab === 0 ? 'black' : 'white' }}></i>
                                    <Ripple />
                                </a>
                            </StyleClass>
                        </div>
                        <img src="/assets/images/blocks/logos/hyper.svg" alt="Image" height="30" className="block lg:hidden" />
                        <StyleClass nodeRef={btnRef11} selector="@next" enterClassName="hidden" enterActiveClassName="fadein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a ref={btnRef11} className="p-ripple cursor-pointer block lg:hidden text-700">
                                <i className="pi pi-ellipsis-v text-2xl" style={{ color: activeTab === 0 ? 'black' : 'white' }}></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <ul
                            className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row lg:w-full
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
                        >
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0" style={{ color: 'black' }}></i>
                                    <span className="block lg:hidden font-medium">Inbox</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <i className="pi pi-star text-base lg:text-2xl mr-2 lg:mr-0" style={{ color: 'black' }}></i>
                                    <span className="block lg:hidden font-medium">Favorites</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <i className="pi pi-user text-base lg:text-2xl mr-2 lg:mr-0" style={{ color: 'black' }}></i>
                                    <span className="block lg:hidden font-medium">Account</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge">
                                        <Badge severity="danger" value={4}></Badge>
                                    </i>
                                    <span className="block lg:hidden font-medium">Notifications</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <CommandMenu className="ml-3" />
                                    <span className="block lg:hidden font-medium">Search</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li className="border-top-1 surface-border lg:border-top-none lg:ml-auto">
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    <img src="/assets/images/blocks/avatars/circle/avatar-f-1.png" className="mr-3 lg:mr-0" style={{ width: '32px', height: '32px' }} alt="avatar-f-1" />
                                    <div className="block lg:hidden">
                                        <div className="text-900 font-medium">Josephine Lillard</div>
                                        <span className="text-600 font-medium text-sm">Marketing Specialist</span>
                                    </div>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-column flex-auto">
                        <div className="absolute border-round surface-border surface-section flex-auto scrolling-div">{props.children ? props.children : <DynamicDashboards />}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(AdminDashLayout);
