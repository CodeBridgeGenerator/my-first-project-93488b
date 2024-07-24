import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { find } from 'lodash';
import { classNames } from 'primereact/utils';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { TabMenu } from 'primereact/tabmenu';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import DynamicDashboards from '../Project/Admin/DynamicDashboards';
import UsersPage from '../UsersPage/UsersPage';
import CommandMenu from '../Project/CommandCenter';
import CompaniesPage from '../CompaniesPage/CompaniesPage';
import BranchesPage from '../BranchesPage/BranchesPage';
import DepartmentsPage from '../DepartmentsPage/DepartmentsPage';
import SectionsPage from '../SectionsPage/SectionsPage';
import RolesPage from '../RolesPage/RolesPage';
import PositionsPage from '../PositionsPage/PositionsPage';
import TemplatesPage from '../TemplatesPage/TemplatesPage';
import MailsPage from '../MailsPage/MailsPage';
import TestsPage from '../TestsPage/TestsPage';
import UserAddressesPage from '../UserAddressesPage/UserAddressesPage';
import CompanyAddressesPage from '../CompanyAddressesPage/CompanyAddressesPage';
import CompanyPhonesPage from '../CompanyPhonesPage/CompanyPhonesPage';
import UserPhonesPage from '../UserPhonesPage/UserPhonesPage';
import UserInvitesPage from '../UserInvitesPage/UserInvitesPage1';
import ProfilesPage from '../ProfilesPage/ProfilesPage';
import PermissionServicesPage from '../PermissionServicesPage/PermissionServicesPage';
import PermissionFieldsPage from '../PermissionFieldsPage/PermissionFieldsPage';
import DynaLoaderPage from '../DynaLoaderPage/DynaLoaderPage1';
import StaffinfoPage from '../StaffinfoPage/StaffinfoPage';
import JobQuesPage from '../JobQuesPage/JobQuesPage1';
import EmployeesPage from '../EmployeesPage/EmployeesPage';
import MailQuesPage from '../MailQuesPage/MailQuesPage1';
import SuperiorPage from '../SuperiorPage/SuperiorPage';
// gen ai
import ChataiProjectLayoutPage from '../ChatAiProjectLayout/ChataiProjectLayoutPage';
import PromptsPage from '../PromptsPage/PromptsPage';
import ChatAiUsagePage from '../ChatAiUsagePage/ChatAiUsagePage';
import LineGraphLayout from '../Project/Admin/LineGraph/LineGraphLayout';

import DepartmentAdminPage from '../DepartmentAdminPage/DepartmentAdminPage';
import DepartmentHODPage from '../DepartmentHODPage/DepartmentHODPage';
import DepartmentHOSPage from '../DepartmentHOSPage/DepartmentHOSPage';
import MailWHPage from '../MailWHPage/MailWHPage1';
import InboxPage from '../InboxPage/InboxPage';
import NotificationsPage from '../NotificationsPage/NotificationsPage';
import ErrorsPage from '../ErrorsPage/ErrorsPage';
import ErrorsWHPage from '../ErrorsWHPage/ErrorsWHPage';
import UserLoginPage from '../UserLoginPage/UserLoginPage1';
import ProductsPage from "../ProductsPage/ProductsPage";
// ~cb-add-import~

const ProjectLayout = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = useParams();

    const btnRefProfile = useRef(null);
    const btnRefMessages = useRef(null);
    const btnRefEnv = useRef(null);
    const btnRef8 = useRef(null);
    const btnRef9 = useRef(null);

    const [activeChild, setActiveChild] = useState('');
    const [tabItems, setTabItems] = useState([]);

    const tabList = ['', 'chatai', '', 'staffInfo', 'users', 'mails', 'permissionServices', 'companies', '', ''];

    const setCurrentActiveTab1 = (tab1) => {
        props.layoutCurrentTab2(tabList[tab1]);
        props.layoutCurrentTab(tab1);
        setActiveChild(tabList[tab1]);
    };

    const setCurrentActiveTab2 = (tab2) => {
        let newTabs = {
            label: tab2,
            icon: 'pi pi-times',
            iconPos: 'right',
            url: `/${tab2}`,
            mainMenu: props?.currentActiveTab,
            command: () => props.layoutCurrentTab2(`/${tab2}`)
        };
        if (tab2 === null) return;
        const pastTabsStr = localStorage.getItem('tabs');
        const pastTabsAry = pastTabsStr ? JSON.parse(pastTabsStr) : [];
        // console.log("pastTabsAry", pastTabsAry);
        if (!find(pastTabsAry, { label: tab2 })) {
            if (pastTabsAry?.length > 8) {
                pastTabsAry?.shift();
                pastTabsAry?.push(newTabs);
            } else pastTabsAry?.push(newTabs);
        }
        if (pastTabsAry?.length > 0) {
            setTabItems(pastTabsAry);
            localStorage.setItem('tabs', JSON.stringify(pastTabsAry));
        }
        const set = props.setCache({ pastTabsAry: pastTabsAry });
        // console.log("project layout", set);
        props.layoutCurrentTab2(tab2);
        setActiveChild(tab2);
    };

    const removeTab = (e) => {
        console.log(e);
        const filteredTabs = tabItems.filter((i) => i.label !== e.label);
        localStorage.setItem('tabs', JSON.stringify(filteredTabs));
        setTabItems(filteredTabs);
    };

    const tabServicesNames = !(tabItems && tabItems.length)
        ? []
        : tabItems.map((elem, index) => ({
              value: index,
              template: (item, options) => {
                  return (
                      /* custom element */
                      <div className="flex align-items-center ">
                          <a className={options.className} target={item.target} onClick={() => setCurrentActiveTab2(item.label)}>
                              <span className={options.labelClassName}>{elem.label}</span>
                          </a>

                          {/* {isEdit ? <i className="pi pi-times text-primary hover" title="delete sevrice" onClick={() => onDeleteServiceHandler(elem, index)} /> : null} */}
                          {props.tabsOpen ? <Button className="p-button-text p-button-rounded no-focus-effect" style={{ marginLeft: '-1rem' }} icon="pi pi-times" onClick={() => removeTab(elem)} title={`delete "${elem.label}"`} /> : null}
                      </div>
                  );
              }
          }));

    const renderChild = (page) => {
        switch (page) {
            case 'companies':
                return <CompaniesPage />;
            case 'branches':
                return <BranchesPage />;
            case 'departments':
                return <DepartmentsPage />;
            case 'sections':
                return <SectionsPage />;
            case 'roles':
                return <RolesPage />;
            case 'positions':
                return <PositionsPage />;
            case 'profiles':
                return <ProfilesPage />;
            case 'templates':
                return <TemplatesPage />;
            case 'mails':
                return <MailsPage />;
            case 'tests':
                return <TestsPage />;
            case 'userAddresses':
                return <UserAddressesPage />;
            case 'companyAddresses':
                return <CompanyAddressesPage />;
            case 'companyPhones':
                return <CompanyPhonesPage />;
            case 'userPhones':
                return <UserPhonesPage />;
            case 'users':
                return <UsersPage />;
            case 'staffInfo':
                return <StaffinfoPage />;
            case 'dynaLoader':
                return <DynaLoaderPage />;
            case 'home':
                return <DynamicDashboards />;
            case 'employees':
                return <EmployeesPage />;
            /* gen ai */
            case 'chatai':
                return <ChataiProjectLayoutPage />;
            case 'prompts':
                return <PromptsPage />;
            case 'usage':
                return <ChatAiUsagePage />;
            // reports
            case 'report1':
                return <LineGraphLayout />;
            case 'superior':
                return <SuperiorPage />;
            case 'mailQues':
                return <MailQuesPage />;
            case 'jobQues':
                return <JobQuesPage />;
            case 'departmentAdmin':
                return <DepartmentAdminPage />;
            case 'departmentHOD':
                return <DepartmentHODPage />;
            case 'departmentHOS':
                return <DepartmentHOSPage />;
            case 'mailWH':
                return <MailWHPage />;
            case 'inbox':
                return <InboxPage />;
            case 'notifications':
                return <NotificationsPage />;
            case 'errors':
                return <ErrorsPage />;
            case 'errorsWH':
                return <ErrorsWHPage />;
            case 'permissionFields':
                return <PermissionFieldsPage />;
            case 'permissionServices':
                return <PermissionServicesPage />;
            case 'userInvites':
                return <UserInvitesPage />;
            case 'userLogin':
                return <UserLoginPage />;
case "products":
                return <ProductsPage />;
            /* ~cb-add-thurthy~ */
            default:
                return props.children ? props.children : <DynamicDashboards />;
        }
    };

    return (
        <>
            <OverlayPanel ref={btnRefProfile}>
                <h6>Current Profile</h6>
                <img src="/assets/images/blocks/avatars/circle/avatar-f-1.png"></img>
            </OverlayPanel>
            <OverlayPanel ref={btnRefMessages}>
                <h6>Messages</h6>
            </OverlayPanel>
            <OverlayPanel ref={btnRefEnv}>
                <h6>Environment</h6>
                <p>
                    <small>url:{process.env.REACT_APP_SERVER_URL}</small>
                </p>
                <p>
                    <small>env:{process.env.REACT_APP_ENV}</small>
                </p>
                <p>
                    <small>s3:{process.env.REACT_APP_S3}</small>
                </p>
                <p>
                    <small>updated:{process.env.REACT_APP_LAST_UPDATED}</small>
                </p>
            </OverlayPanel>
            <div className="flex relative lg:static surface-0" style={{ minHeight: '80vh', marginTop: '70px' }}>
                <div id="app-sidebar" className={classNames('h-full lg:h-auto flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border', { hidden: !props.menuOpen })}>
                    <div
                        className={classNames('flex h-full block', {
                            hidden: !props.menuOpen
                        })}
                    >
                        <div
                            className="flex flex-column h-full w-2 flex-shrink-0 select-none"
                            style={{
                                backgroundImage: 'linear-gradient(to right top, #d30078, #d1008f, #c600ab, #af00ca, #8312eb)'
                            }}
                        >
                            <div className="flex align-items-center justify-content-center flex-shrink-0">
                                {/* <Button
                  icon="pi pi-arrow-left"
                  rounded
                  className="mt-1"
                  style={{ color: "white" }}
                  outlined
                  aria-label="home"
                  onClick={() => props.layoutMenuToggle(false)}
                /> */}
                            </div>
                            <div className="overflow-y-auto mt-3">
                                {/* side menu */}
                                <ul className="list-none py-4 pl-2 pr-0 m-0">
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', { 'bg-white': props?.currentActiveTab == 0 })}
                                            onClick={() => {
                                                setCurrentActiveTab1(0);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <label
                                                className="text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 0 ? 'black' : 'white'
                                                }}
                                            >
                                                App
                                            </label>
                                            <Ripple />
                                        </a>
                                    </li>

                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 6
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(6);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-crown text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 6 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>

                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 1
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(1);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-microchip-ai text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 1 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>

                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 3
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(3);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-objects-column text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 3 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 4
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(4);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-users text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 4 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 5
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(5);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-comments text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 5 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 2
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(2);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-chart-line text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 2 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 7
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(7);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-building text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 7 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 8
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(8);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-megaphone text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 8 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 9
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(9);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-question-circle text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 9 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a
                                            className={classNames('p-ripple flex align-items-center cursor-pointer py-3 pl-0 pr-2 justify-content-center hover:bg-indigo-600 text-indigo-100 hover:text-indigo-50 transition-duration-150 transition-colors', {
                                                'bg-white': props?.currentActiveTab === 10
                                            })}
                                            onClick={() => {
                                                setCurrentActiveTab1(10);
                                                setCurrentActiveTab2(null);
                                            }}
                                            style={{
                                                borderTopLeftRadius: '30px',
                                                borderBottomLeftRadius: '30px'
                                            }}
                                        >
                                            <i
                                                className="pi pi-cog text-xl"
                                                style={{
                                                    color: props?.currentActiveTab === 10 ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <Ripple />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-auto">
                                <hr className="mb-3 mx-2 border-top-1 border-none border-indigo-300" />
                                <a
                                    className="p-ripple m-3 flex align-items-center cursor-pointer p-2 justify-content-center hover:bg-indigo-600 border-round text-300 hover:text-0
            transition-duration-150 transition-colors"
                                >
                                    <Avatar
                                        image="assets/logo/cb-logo-500.png"
                                        style={{
                                            width: '60px',
                                            height: '30px',
                                            borderTopLeftRadius: '50px',
                                            borderBottomLeftRadius: '50px',
                                            borderTopRightRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            backgroundColor: '#fff'
                                        }}
                                        size="small"
                                        shape="circle"
                                        alt="avatar-f-1"
                                    />
                                    <Ripple />
                                </a>
                            </div>
                        </div>
                        <div
                            className={classNames('flex flex-column bg-white p-4 overflow-y-auto flex-shrink-0 flex-grow-1 md:flex-grow-0')}
                            style={{
                                width: '300px',
                                maxHeight: '100vh'
                            }}
                        >
                            <div className={classNames('justify-content-end mb-3 flex lg:hidden')}>
                                <StyleClass nodeRef={btnRef9} selector="#app-sidebar" leaveToClassName="hidden" leaveActiveClassName="fadeoutleft">
                                    <button
                                        ref={btnRef9}
                                        label="bb"
                                        icon="pi pi-times"
                                        className="p-ripple cursor-pointer text-white appearance-none bg-transparent border-none inline-flex justify-content-center align-items-center border-circle hover:bg-indigo-600 transition-duration-150 transition-colors"
                                        style={{ width: '2rem', height: '2rem' }}
                                    >
                                        <i
                                            className="pi pi-times text-xl text-indigo-100"
                                            style={{
                                                color: props?.currentActiveTab === 0 ? 'black' : 'white'
                                            }}
                                        ></i>
                                        <Ripple />
                                    </button>
                                </StyleClass>
                            </div>
                            <div className={classNames('border-round flex-auto')}>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 0
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">App Services</div>
<li
                onClick={() => {
                  setCurrentActiveTab2("products");
                }}
                className={classNames("mb-3 flex align-items-start p-3", {
                  "bg-yellow-700": props?.currentActiveTab2 === "products",
                })}
                style={{ borderRadius: "12px" }}
              >
                <i
                  className="pi pi-user text-xl mr-3 "
                  style={{ color: props?.currentActiveTab2 !== "products" ? "black" : "white" }}
                ></i>
                <div className="flex flex-column">
                  <span
                    className={classNames({
                      "text-white": props?.currentActiveTab2 === "products",
                      "text-black": props?.currentActiveTab2 !== "products",
                    })}
                  >
                  Products
                  </span>
                  <p
                    className={classNames("mt-2 mb-0 line-height-3 ", {
                      "text-yellow-500": props?.currentActiveTab2 === "products",
                      "text-yellow-700": props?.currentActiveTab2 !== "products",
                    })}
                  >
                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                  </p>
                </div>
              </li>
                                    <ul className="list-none p-0 m-0">{/* ~cb-add-services-card~ */}</ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 1
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Gen Ai</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('chatai');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'chatai'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-comments text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'chatai' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'chatai',
                                                        'text-black': props?.currentActiveTab2 !== 'chatai'
                                                    })}
                                                >
                                                    Chat Ai
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'chatai',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'chatai'
                                                    })}
                                                >
                                                    Gen Ai chat window to promt the system.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('prompts');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'prompts'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-comment text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'prompts' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'prompts',
                                                        'text-black': props?.currentActiveTab2 !== 'prompts'
                                                    })}
                                                >
                                                    Prompts
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'prompts',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'prompts'
                                                    })}
                                                >
                                                    Prompts history with cost and monitoring.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('usage');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'usage'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-chart-pie text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'usage' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'usage',
                                                        'text-black': props?.currentActiveTab2 !== 'usage'
                                                    })}
                                                >
                                                    Usage
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'usage',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'usage'
                                                    })}
                                                >
                                                    Usage history with cost and monitoring.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 2
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Reports & Dashboards</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('report1');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'report1'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-users text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'report1' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'report1',
                                                        'text-black': props?.currentActiveTab2 !== 'report1'
                                                    })}
                                                >
                                                    Usage Report 1{' '}
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'report1',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'report1'
                                                    })}
                                                >
                                                    Various forms reports can be generated.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 3
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Data Management</div>
                                    <ul className="list-none p-0 m-0">
                                        {/* ~cb-add-ref-services-card~ */}
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('staffInfo');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'staffInfo'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-users text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'staffInfo' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'staffInfo',
                                                        'text-black': props?.currentActiveTab2 !== 'staffInfo'
                                                    })}
                                                >
                                                    Staff Info
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'staffInfo',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'staffInfo'
                                                    })}
                                                >
                                                    Load staff info, then use the dynaloader to map fields to services.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('dynaLoader');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'dynaLoader'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-cloud-upload text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'dynaLoader' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'dynaLoader',
                                                        'text-black': props?.currentActiveTab2 !== 'dynaLoader'
                                                    })}
                                                >
                                                    DynaLoader
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'dynaLoader',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'dynaLoader'
                                                    })}
                                                >
                                                    Automatically maps and integrates data fields dynamically.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('jobQues');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'jobQues'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-spin pi-spinner-dotted text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'jobQues' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'jobQues',
                                                        'text-black': props?.currentActiveTab2 !== 'jobQues'
                                                    })}
                                                >
                                                    Job Ques
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'jobQues',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'jobQues'
                                                    })}
                                                >
                                                    Processes job queues for efficient data management.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 4
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Users Management</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('users');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'users'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-users text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'users' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'users',
                                                        'text-black': props?.currentActiveTab2 !== 'users'
                                                    })}
                                                >
                                                    Users{' '}
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'users',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'users'
                                                    })}
                                                >
                                                    Users interact, admins manage, both uphold application integrity.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('profiles');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'profiles'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-user-edit text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'profiles' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'profiles',
                                                        'text-black': props?.currentActiveTab2 !== 'profiles'
                                                    })}
                                                >
                                                    Profiles
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'profiles',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'profiles'
                                                    })}
                                                >
                                                    User-specific settings and preferences within applications.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('employees');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'employees'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-warehouse text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'employees' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'employees',
                                                        'text-black': props?.currentActiveTab2 !== 'employees'
                                                    })}
                                                >
                                                    Employees
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'employees',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'employees'
                                                    })}
                                                >
                                                    List and manage staff information and roles.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('userInvites');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'userInvites'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-users text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'userInvites' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'userInvites',
                                                        'text-black': props?.currentActiveTab2 !== 'userInvites'
                                                    })}
                                                >
                                                    User Invites
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'userInvites',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'userInvites'
                                                    })}
                                                >
                                                    List of users that are able to login.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('userLogin');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'userLogin'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-sign-in text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'userLogin' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'userLogin',
                                                        'text-black': props?.currentActiveTab2 !== 'userLogin'
                                                    })}
                                                >
                                                    UserLogin
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'userLogin',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'userLogin'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('superior');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'superior'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-gauge text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'superior' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'superior',
                                                        'text-black': props?.currentActiveTab2 !== 'superior'
                                                    })}
                                                >
                                                    Superiors
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'superior',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'superior'
                                                    })}
                                                >
                                                    Oversee employees, assign tasks, manage performance.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('roles');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'roles'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-bullseye text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'roles' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'roles',
                                                        'text-black': props?.currentActiveTab2 !== 'roles'
                                                    })}
                                                >
                                                    Roles
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'roles',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'roles'
                                                    })}
                                                >
                                                    Assign permissions defining user access and capabilities.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('positions');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'positions'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-compass text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'positions' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'positions',
                                                        'text-black': props?.currentActiveTab2 !== 'positions'
                                                    })}
                                                >
                                                    Positions
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'positions',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'positions'
                                                    })}
                                                >
                                                    Define hierarchical roles within organizational structure dynamically.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('userAddresses');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'userAddresses'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-map-marker text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'userAddresses' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'userAddresses',
                                                        'text-black': props?.currentActiveTab2 !== 'userAddresses'
                                                    })}
                                                >
                                                    Addresses
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'userAddresses',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'userAddresses'
                                                    })}
                                                >
                                                    Store and manage contact information for users.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('userPhones');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'userPhones'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-mobile text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'userPhones' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'userPhones',
                                                        'text-black': props?.currentActiveTab2 !== 'userPhones'
                                                    })}
                                                >
                                                    Phones
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'userPhones',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'userPhones'
                                                    })}
                                                >
                                                    Manage and store contact numbers for users efficiently.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 5
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Messaging</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('notifications');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'notifications'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-bell text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'notifications' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'notifications',
                                                        'text-black': props?.currentActiveTab2 !== 'notifications'
                                                    })}
                                                >
                                                    Notifications
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'notifications',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'notifications'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('templates');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'templates'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-pen-to-square text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'templates' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'templates',
                                                        'text-black': props?.currentActiveTab2 !== 'templates'
                                                    })}
                                                >
                                                    Email Templates
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'templates',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'templates'
                                                    })}
                                                >
                                                    Pre-defined formats for automated email communications.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('mails');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'mails'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-map text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'mails' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'mails',
                                                        'text-black': props?.currentActiveTab2 !== 'mails'
                                                    })}
                                                >
                                                    Mail Sent Logs
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'mails',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'mails'
                                                    })}
                                                >
                                                    Track and manage email communication records securely.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('mailQues');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'mailQues'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-spin pi-envelope text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'mailQues' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'mailQues',
                                                        'text-black': props?.currentActiveTab2 !== 'mailQues'
                                                    })}
                                                >
                                                    Mail Job Ques
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'mailQues',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'mailQues'
                                                    })}
                                                >
                                                    Pre-defined jobs for managing email sending job queues.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('mailWH');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'mailWH'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-database text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'mailWH' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'mailWH',
                                                        'text-black': props?.currentActiveTab2 !== 'mailWH'
                                                    })}
                                                >
                                                    Mail Warehouse
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'mailWH',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'mailWH'
                                                    })}
                                                >
                                                    Stored in a data warehouse for business analytics.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 6
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Admin Controls</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('departmentAdmin');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'departmentAdmin'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-th-large text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'departmentAdmin' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'departmentAdmin',
                                                        'text-black': props?.currentActiveTab2 !== 'departmentAdmin'
                                                    })}
                                                >
                                                    Department Admin
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'departmentAdmin',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'departmentAdmin'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('departmentHOD');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'departmentHOD'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-verified text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'departmentHOD' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'departmentHOD',
                                                        'text-black': props?.currentActiveTab2 !== 'departmentHOD'
                                                    })}
                                                >
                                                    Head of Department
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'departmentHOD',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'departmentHOD'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('departmentHOS');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'departmentHOS'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-trophy text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'departmentHOS' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'departmentHOS',
                                                        'text-black': props?.currentActiveTab2 !== 'departmentHOS'
                                                    })}
                                                >
                                                    Head of Section
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'departmentHOS',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'departmentHOS'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('permissionServices');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'permissionServices'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-sliders-h text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'permissionServices' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'permissionServices',
                                                        'text-black': props?.currentActiveTab2 !== 'permissionServices'
                                                    })}
                                                >
                                                    Service Permissions
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'permissionServices',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'permissionServices'
                                                    })}
                                                >
                                                    Control access rights to specific application Services.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('tests');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'tests'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-clock text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'tests' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'tests',
                                                        'text-black': props?.currentActiveTab2 !== 'tests'
                                                    })}
                                                >
                                                    Testing Job Tasks
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'tests',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'tests'
                                                    })}
                                                >
                                                    Automates and manages test execution and scheduling.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 7
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Company Data</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('companies');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'companies'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-building text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'companies' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'companies',
                                                        'text-black': props?.currentActiveTab2 !== 'companies'
                                                    })}
                                                >
                                                    Companies
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'companies',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'companies'
                                                    })}
                                                >
                                                    Manages separate companies within a shared application.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('branches');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'branches'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-building-columns text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'branches' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'branches',
                                                        'text-black': props?.currentActiveTab2 !== 'branches'
                                                    })}
                                                >
                                                    Branches
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'branches',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'branches'
                                                    })}
                                                >
                                                    Hierarchical branches of companies in shared applications.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('departments');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'departments'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-briefcase text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'departments' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'departments',
                                                        'text-black': props?.currentActiveTab2 !== 'departments'
                                                    })}
                                                >
                                                    Departments
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'departments',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'departments'
                                                    })}
                                                >
                                                    Hierarchical departments of companies in shared applications.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('sections');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'sections'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-hammer text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'sections' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'sections',
                                                        'text-black': props?.currentActiveTab2 !== 'sections'
                                                    })}
                                                >
                                                    Sections
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'sections',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'sections'
                                                    })}
                                                >
                                                    Hierarchical sections of departments in shared applications.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('companyAddresses');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'companyAddresses'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-map text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'companyAddresses' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'companyAddresses',
                                                        'text-black': props?.currentActiveTab2 !== 'companyAddresses'
                                                    })}
                                                >
                                                    Company Addresses
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'companyAddresses',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'companyAddresses'
                                                    })}
                                                >
                                                    Location details for branches within companies.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('companyPhones');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'companyPhones'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-phone text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'companyPhones' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'companyPhones',
                                                        'text-black': props?.currentActiveTab2 !== 'companyPhones'
                                                    })}
                                                >
                                                    Company Phones
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'companyPhones',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'companyPhones'
                                                    })}
                                                >
                                                    Manages contact numbers for branches within companies.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 8
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Bugs Tracking</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('errors');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'errors'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-directions-alt text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'errors' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'errors',
                                                        'text-black': props?.currentActiveTab2 !== 'errors'
                                                    })}
                                                >
                                                    Errors
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'errors',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'errors'
                                                    })}
                                                >
                                                    Tracking all the bugs as they occur.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('errorsWH');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'errorsWH'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-database text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'errorsWH' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'errorsWH',
                                                        'text-black': props?.currentActiveTab2 !== 'errorsWH'
                                                    })}
                                                >
                                                    ErrorsWH
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'errorsWH',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'errorsWH'
                                                    })}
                                                >
                                                    Accumsan sit amet nulla facilisi morbi tempus iaculis.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('tickets');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'tickets'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-id-card text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'tickets' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'tickets',
                                                        'text-black': props?.currentActiveTab2 !== 'tickets'
                                                    })}
                                                >
                                                    Tickets
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'tickets',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'tickets'
                                                    })}
                                                >
                                                    Open and closed Tickets raised for all bugs and error.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('bugs');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'bugs'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-asterisk text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'bugs' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'bugs',
                                                        'text-black': props?.currentActiveTab2 !== 'bugs'
                                                    })}
                                                >
                                                    Bugs History
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'bugs',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'bugs'
                                                    })}
                                                >
                                                    Open and closed Tickets raised for all bugs and error.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('revisions');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'revisions'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-exclamation-triangle text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'revisions' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'revisions',
                                                        'text-black': props?.currentActiveTab2 !== 'revisions'
                                                    })}
                                                >
                                                    Revision History
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'revisions',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'revisions'
                                                    })}
                                                >
                                                    Breaking and non-breaking revision history to capture the evolution of the application.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 9
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Help & Documentation</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('videos');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'videos'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-video text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'videos' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'videos',
                                                        'text-black': props?.currentActiveTab2 !== 'videos'
                                                    })}
                                                >
                                                    Videos
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'videos',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'videos'
                                                    })}
                                                >
                                                    Help videos on how to use the service or application.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('guides');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'guides'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-list-check text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'guides' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'guides',
                                                        'text-black': props?.currentActiveTab2 !== 'guides'
                                                    })}
                                                >
                                                    User Guides
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'guides',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'guides'
                                                    })}
                                                >
                                                    User guide for each service in the application.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('podcast');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'podcast'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-microphone text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'podcast' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'podcast',
                                                        'text-black': props?.currentActiveTab2 !== 'podcast'
                                                    })}
                                                >
                                                    Pod Casts
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'podcast',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'podcast'
                                                    })}
                                                >
                                                    Audio podCast related to the service and application.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={classNames({
                                        hidden: props?.currentActiveTab !== 10
                                    })}
                                >
                                    <div className="p-3 font-medium text-2xl mb-5">Settings</div>
                                    <ul className="list-none p-0 m-0">
                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('app-settings');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'app-settings'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-video text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'app-settings' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'app-settings',
                                                        'text-black': props?.currentActiveTab2 !== 'app-settings'
                                                    })}
                                                >
                                                    Application Settings
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'app-settings',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'app-settings'
                                                    })}
                                                >
                                                    Application settings to uptimze usage for all users.
                                                </p>
                                            </div>
                                        </li>

                                        <li
                                            onClick={() => {
                                                setCurrentActiveTab2('service-settings');
                                            }}
                                            className={classNames('mb-3 flex align-items-start p-3', {
                                                'bg-indigo-700': props?.currentActiveTab2 === 'service-settings'
                                            })}
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <i
                                                className="pi pi-list-check text-xl mr-3 "
                                                style={{
                                                    color: props?.currentActiveTab2 !== 'service-settings' ? 'black' : 'white'
                                                }}
                                            ></i>
                                            <div className="flex flex-column">
                                                <span
                                                    className={classNames({
                                                        'text-white': props?.currentActiveTab2 === 'service-settings',
                                                        'text-black': props?.currentActiveTab2 !== 'service-settings'
                                                    })}
                                                >
                                                    Service Settings
                                                </span>
                                                <p
                                                    className={classNames('mt-2 mb-0 line-height-3 ', {
                                                        'text-indigo-500': props?.currentActiveTab2 === 'service-settings',
                                                        'text-indigo-700': props?.currentActiveTab2 !== 'service-settings'
                                                    })}
                                                >
                                                    Service settings to customize the user experience.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames('min-h-screen flex flex-column relative flex-auto')}>
                    <div className="flex justify-content-between lg:justify-content-start align-items-center px-5 surface-section border-bottom-1 surface-border relative lg:static" style={{ height: '60px' }}>
                        <ul
                            className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row lg:w-full
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
                        >
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-2 lg:py-2 mr-1 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                    onClick={() => props.layoutMenuToggle(!props.menuOpen)}
                                >
                                    <i
                                        className={classNames('text-base lg:text-2xl mr-2 lg:mr-0 pi', {
                                            'pi-arrow-right': !props.menuOpen,
                                            'pi-arrow-left': props.menuOpen
                                        })}
                                        style={{ color: 'black' }}
                                    ></i>
                                    <span className="block lg:hidden font-medium">Menu</span>
                                    <Ripple />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                    onClick={() => setCurrentActiveTab2('inbox')}
                                >
                                    <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0" style={{ color: 'black' }}></i>
                                    <span className="block lg:hidden font-medium">Inbox</span>
                                    <Ripple />
                                </a>
                            </li>
                            {/* <li>
                <a
                  className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                >
                  <i
                    className={classNames(
                      "text-base lg:text-2xl mr-2 lg:mr-0",
                      {
                        "pi pi-star-fill": props.tabsOpen,
                        "pi pi-star": !props.tabsOpen,
                      }
                    )}
                    style={{ color: "black" }}
                    onClick={() => props.layoutTabsToggle(!props.tabsOpen)}
                  ></i>
                  <span className="block lg:hidden font-medium">Favs</span>
                  <Ripple />
                </a>
              </li> */}
                            <li>
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                    onClick={(e) => btnRefEnv.current?.toggle(e)}
                                >
                                    <i className={classNames('text-base lg:text-2xl mr-2 lg:mr-0 pi pi-server')} style={{ color: 'black' }}></i>
                                    <span className="block lg:hidden font-medium">Envs</span>
                                    <Ripple />
                                </a>
                            </li>
                            {/* <li>
                <a
                  className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                  onClick={(e) => btnRefProfile.current?.toggle(e)}
                >
                  <i
                    className="pi pi-user text-base lg:text-2xl mr-2 lg:mr-0"
                    style={{ color: "black" }}
                  ></i>
                  <span className="block lg:hidden font-medium">Account</span>
                  <Ripple />
                </a>
              </li> */}

                            {/* <li>
                <a
                  className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                >
                  <i
                    className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge"
                    onClick={(e) => btnRefMessages.current?.toggle(e)}
                  >
                    <Badge severity="danger" value={4}></Badge>
                  </i>
                  <span className="block lg:hidden font-medium">
                    Notifications
                  </span>
                  <Ripple />
                </a>
              </li> */}
                            <li className="border-top-1 surface-border lg:border-top-none lg:ml-auto">
                                <a
                                    className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors"
                                >
                                    {/* <CommandMenu className="ml-3" /> */}
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
                        <StyleClass nodeRef={btnRef8} selector="#rightsidebar" enterFromClassName="hidden" enterActiveClassName="fadeinright" leaveToClassName="hidden" leaveActiveClassName="fadeoutright" hideOnOutsideClick>
                            <a ref={btnRef8} className="p-ripple cursor-pointer block text-700 ml-3">
                                <i className="pi pi-arrow-left text-2xl"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                    </div>

                    <div className="flex flex-column flex-auto">
                        <div className="ml-3">
                            {/* <TabMenu
                model={props.tabsOpen ? [...tabServicesNames] : tabServicesNames}
              /> */}
                        </div>
                        <div className="p-5 flex flex-auto">
                            <div className="surface-border border-round surface-section flex-auto">
                                {/* <div className="border-round surface-border surface-section flex-auto scrolling-div"> */}
                                {_.isEmpty(urlParams) || props?.currentActiveTab2 === activeChild ? renderChild(props?.currentActiveTab2) : props.children}
                                {/* </div> */}
                            </div>
                        </div>
                        <div id="rightsidebar" className="overlay-auto z-1 surface-overlay shadow-2 hidden absolute right-0 w-20rem animation-duration-150 animation-ease-in-out" style={{ top: '60px', height: 'calc(100% - 60px)' }}>
                            <div className="flex flex-column h-full p-4">
                                <span className="text-xl font-medium text-900 mb-3">Help bar</span>
                                <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    const { menuOpen, tabsOpen, currentActiveTab, currentActiveTab2 } = state.layout;
    return { user, menuOpen, tabsOpen, currentActiveTab, currentActiveTab2 };
};
const mapDispatch = (dispatch) => ({
    layoutMenuToggle: (bool) => dispatch.layout.menu(bool),
    layoutTabsToggle: (bool) => dispatch.layout.tab(bool),
    layoutCurrentTab: (bool) => dispatch.layout.activeTab(bool),
    layoutCurrentTab2: (bool) => dispatch.layout.activeTab2(bool),
    getCache: () => dispatch.cache.get(),
    setCache: (data) => dispatch.cache.set(data)
});

export default connect(mapState, mapDispatch)(ProjectLayout);
