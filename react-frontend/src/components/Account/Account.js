import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { classNames } from 'primereact/utils';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { TabMenu } from 'primereact/tabmenu';
import client from '../../services/restClient';
import AccountChangePassword from './AccountChangePassword';
import AccountChangeName from './AccountChangeName';
import AccountChangeImage from './AccountChangeImage';
import ProfilesCreateDialogComponent from '../ProfilesPage/ProfilesCreateDialogComponent';
import ProfilesEditDialogComponent from '../ProfilesPage/ProfilesEditDialogComponent';

const Account = (props) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showChangeName, setShowChangeName] = useState(false);
    const [showChangeImage, setShowChangeImage] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [editProfile, setEditProfile] = useState(false);
    const [iprofile, setIProfile] = useState(0);
    const [role, setRole] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (iprofile && data[iprofile]?.position?.roleId)
            client
                .service('roles')
                .find({ query: { roleId: data[iprofile].position.roleId } })
                .then((res) => setRole(res.data[0].name));
    }, [iprofile]);

    useEffect(() => {
        client
            .service('profiles')
            .find({
                query: {
                    $limit: 10000,
                    $populate: [
                        {
                            path: 'userId',
                            service: 'users',
                            select: ['name']
                        },
                        {
                            path: 'company',
                            service: 'companies',
                            select: ['name']
                        },
                        {
                            path: 'position',
                            service: 'positions',
                            select: ['name', 'roleId']
                        },
                        {
                            path: 'branch',
                            service: 'branches',
                            select: ['name']
                        },
                        {
                            path: 'section',
                            service: 'sections',
                            select: ['name']
                        },
                        {
                            path: 'department',
                            service: 'departments',
                            select: ['name']
                        },
                        {
                            path: 'address',
                            service: 'user_addresses',
                            select: ['userId', 'Street1', 'Street2', 'Poscode', 'City', 'State', 'Province', 'Country']
                        },
                        {
                            path: 'phone',
                            service: 'user_phones',
                            select: ['userId', 'countryCode', 'operatorCode', 'number', 'type']
                        }
                    ]
                }
            })
            .then((res) => {
                let results = res.data;
                setData(results);
            })
            .catch((error) => {
                props.alert({
                    title: 'User Profiles',
                    type: 'error',
                    message: error.message || 'Failed get profiles'
                });
            });
    }, []);

    const items = [
        { label: 'Profiles', icon: 'pi pi-users' }
        // { label: "Login History", icon: "pi pi-sign-in" },
        // { label: "Sessions", icon: "pi pi-building" },
        // { label: "Social Media", icon: "pi pi-share-alt" },
        // { label: "Preferences", icon: "pi pi-briefcase" },
        // { label: "Settings", icon: "pi pi-cog" },
    ];

    const profile = (data, i, len) => (
        <>
            <div className="surface-section px-6 py-5">
                <div className="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
                    <div className="flex align-items-start flex-column md:flex-row">
                        <Avatar className="p-overlay-badge m-3" icon="pi pi-user" size="xlarge" style={{ height: '6rem', width: '6rem' }} onClick={() => setShowChangeImage(true)}></Avatar>
                        <i className="m-1 pi pi-fw pi-image" onClick={() => setShowChangeImage(true)} style={{ color: 'red' }}></i>
                        <div className="ml-8">
                            <span className="text-900 font-medium text-3xl">
                                <p className="m-0">
                                    {props.user?.name} <i onClick={() => setShowChangeName(true)} className="pi pi-fw pi-pencil" style={{ color: 'red' }}></i>
                                </p>
                            </span>
                            <div className="grid p-0 no-gutter">
                                <div className="col-6">
                                    <small>{props.user?.email}</small>
                                    <i className="pi pi-star text-2xl ml-4 text-yellow-500"></i>
                                </div>

                                <div className="col-6 flex flex-column align-items-end">
                                    <Button text label="change password" onClick={() => setShowChangePassword(true)}></Button>
                                </div>
                            </div>
                            <div className="flex align-items-center flex-wrap text-sm">
                                <div className="mr-5 mt-3">
                                    <span className="font-medium text-500">APPRAISORS</span>
                                    <div className="text-700 mt-2">333</div>
                                </div>
                                <div className="mr-5 mt-3">
                                    <span className="font-medium text-500">DEPARTMENT</span>
                                    <div className="text-700 mt-2">26</div>
                                </div>
                                <div className="mr-5 mt-3">
                                    <span className="font-medium text-500">APPRIASEE's</span>
                                    <div className="text-700 mt-2">17</div>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium text-500">SECTION</span>
                                    <div className="text-700 mt-2">130</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 lg:mt-0">
                        <Button onClick={() => setIProfile((prev) => (prev - 1 >= 0 ? prev - 1 : 0))} icon="pi pi-angle-left" className="p-button-rounded mr-2" />
                        <Button onClick={() => setIProfile((prev) => (prev + 1 < len ? prev + 1 : prev))} icon="pi pi-angle-right" className="p-button-rounded p-button-success mr-2" />
                        {/* <Button
              icon="pi pi-list"
              className="p-button-rounded p-button-help"
            /> */}
                    </div>
                </div>
            </div>
            <div className="px-6 py-5">
                <div className="grid no-gutter surface-card p-4 shadow-2 border-round">
                    <div className="col-6 font-medium text-3xl text-900 mb-3">
                        Profile {i + 1} / {len}
                    </div>
                    <div className="col-6 flex justify-content-end">
                        <Button label="Edit Profile" text onClick={() => setEditProfile(true)}></Button>
                    </div>
                    <div className="col-12 text-500 mb-5">Egestas sed tempus urna et pharetra pharetra massa massa ultricies.</div>
                    <ul className="list-none p-0 m-0 border-top-1 border-300">
                        <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                            <div className="text-500 w-full md:w-2 font-medium">Name</div>
                            <div className="text-900 w-full md:w-10">{props.user.name}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap">
                            <div className="text-500 w-full md:w-2 font-medium">Bio</div>
                            <div className="text-900 w-full md:w-10 line-height-3">
                                {data?.bio
                                    ? data.bio
                                    : `Faucibus pulvinar elementum integer enim neque volutpat ac
                tincidunt vitae. Commodo odio aenean sed adipiscing diam donec
                adipiscing tristique. Eget felis eget nunc lobortis mattis
                aliquam faucibus purus in.`}
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                            <div className="text-500 w-full md:w-2 font-medium">Company</div>
                            <div className="grid no-gutter text-900 w-full md:w-10">
                                <div className="col-6">{data?.company?.name} </div>
                                <div className="col-6">
                                    <span>
                                        {' '}
                                        <b>branch:</b> {data?.branch?.name}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap">
                            <div className="text-500 w-full md:w-2 font-medium">Department</div>
                            <div className="grid text-900 w-full md:w-10 line-height-3">
                                <div className="col-6">
                                    {data?.department?.name}{' '}
                                    {data?.hod ? (
                                        <i className="flex justify-content-center pi pi-check ml-3" style={{ color: 'green' }}>
                                            Is Head Of Department {String(data.hod)}
                                        </i>
                                    ) : null}{' '}
                                </div>
                                <div className="col-6">
                                    <span className="">
                                        {' '}
                                        <b>section:</b> {data?.section?.name}{' '}
                                        {data?.hos ? (
                                            <i className="flex justify-content-end pi pi-check mr-3" style={{ color: 'green' }}>
                                                Is Head Of Section
                                            </i>
                                        ) : null}{' '}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                            <div className="text-500 w-full md:w-2 font-medium">Position</div>
                            <div className="grid text-900 w-full md:w-10">
                                <div className="col-6">{data?.position?.name}</div>
                                <div className="col-6">
                                    <span>
                                        {' '}
                                        <b>role:</b> {role}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap">
                            <div className="text-500 w-full md:w-2 font-medium">Skills</div>
                            <div className="text-900 w-full md:w-10">
                                {data?.skills.map((s) => (
                                    <Tag className="mr-2" value={s} rounded />
                                ))}
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                            <div className="text-500 w-full md:w-2 font-medium">Phones</div>
                            <div className="text-900 w-full md:w-10">
                                <div className="grid mt-0 mr-0">
                                    {data?.phones ? (
                                        <>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-phone mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-phone mr-2"></i>
                                                        <span className="font-medium">{data?.phones.type}</span>
                                                    </div>
                                                    <div className="text-700">{`${data?.phones.countryCode} ${data?.phones.operatorCode} ${data?.phones.number}`}</div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-phone mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-phone mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                            <div className="text-500 w-full md:w-2 font-medium">Addresses</div>
                            <div className="text-900 w-full md:w-10">
                                <div className="grid mt-0 mr-0">
                                    {data?.addresses ? (
                                        <>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-map-marker mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-map-marker mr-2"></i>
                                                        <span className="font-medium">Address {i + 1}</span>
                                                    </div>
                                                    <div className="text-700">
                                                        {`${data?.addresses?.Street1} ${data?.addresses?.Street2}`}
                                                        {`${data?.addresses?.Poscode} ${data?.addresses?.City}`}
                                                        {`${data?.addresses?.State} ${data?.addresses?.Country}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-map-marker mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                            <div className="col-12 md:col-6">
                                                <div className="p-3 border-1 surface-border border-round surface-card">
                                                    <div className="text-900 mb-2">
                                                        <i className="pi pi-map-marker mr-2"></i>
                                                        <span className="font-medium">Please add your contact</span>
                                                    </div>
                                                    <div className="text-700">The Most Complete Angular UI Component</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );

    const loginHistory = () => <div>Todo</div>;
    const sessions = () => <div>Todo</div>;
    const preferences = () => <div>Todo</div>;
    const settings = () => <div>Todo</div>;

    return (
        <>
            <div className="col-12 flex justify-content-center mt-8">
                <div className="card col-8">
                    <div className="flex flex-column align-items-start mb-3">
                        <div className="surface-ground">
                            <div className="surface-section px-6 pt-5">
                                <div className="text-3xl font-medium text-900 mb-4">My Profiles</div>
                                <TabMenu model={items} activeitem={items[0]} onTabChange={(e) => setActiveTabIndex(e.index)} disabled={true} />
                            </div>
                            {activeTabIndex === 0 ? profile(data[iprofile], iprofile, data.length) : null}
                        </div>
                    </div>
                </div>
            </div>

            <AccountChangePassword show={showChangePassword} onHide={() => setShowChangePassword(false)} />
            <AccountChangeName show={showChangeName} onHide={() => setShowChangeName(false)} />
            <AccountChangeImage show={showChangeImage} onHide={() => setShowChangeImage(false)} />

            {_.isEmpty(data) ? (
                <ProfilesCreateDialogComponent show={editProfile} onHide={() => setEditProfile(false)} userId={props.user._id}></ProfilesCreateDialogComponent>
            ) : (
                <ProfilesEditDialogComponent show={editProfile} entity={data[iprofile]} onHide={() => setEditProfile(false)} userId={props.user._id}></ProfilesEditDialogComponent>
            )}
        </>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(Account);
