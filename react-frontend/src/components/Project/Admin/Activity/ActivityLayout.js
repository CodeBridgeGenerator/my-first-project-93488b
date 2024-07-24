import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const ActivityLayout = (props) => {
    const menu1 = useRef(null);
    const items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];

    return (
        <div className="col-12 lg:col-6">
            <div className="surface-card shadow-2 border-round p-4 h-full">
                <div className="flex align-items-center justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">Team Activity</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu1.current.toggle(event)} />
                        <Menu ref={menu1} popup model={items} />
                    </div>
                </div>
                <ul className="list-none p-0 m-0">
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <img src="/assets/images/blocks/avatars/circle-big/avatar-f-1.png" alt="avatar-f-1" className="mr-3 w-3rem h-3rem" />
                            <div>
                                <span className="text-900 font-medium block mb-2">Jane Cooper</span>
                                <div className="text-700 mb-2">responded to an issue.</div>
                                <a className="text-primary cursor-pointer">
                                    <i className="pi pi-github text-sm mr-2"></i>
                                    <span>Issue #1185</span>
                                </a>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">14 mins ago</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <img src="/assets/images/blocks/avatars/circle-big/avatar-m-1.png" alt="avatar-m-1" className="mr-3 w-3rem h-3rem" />
                            <div>
                                <span className="text-900 font-medium block mb-2">Robert Fox</span>
                                <div className="text-700">
                                    changed team size from <span className="text-900 font-medium">5</span> to <span className="text-900 font-medium">6</span>.
                                </div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">20 mins ago</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <img src="/assets/images/blocks/avatars/circle-big/avatar-f-2.png" alt="avatar-f-2" className="mr-3 w-3rem h-3rem" />
                            <div>
                                <span className="text-900 font-medium block mb-2">Kristin Watson Cooper</span>
                                <div className="text-700 mb-2">created a Q4 presentation to an issue.</div>
                                <a className="text-primary cursor-pointer">
                                    <i className="pi pi-file-pdf text-sm mr-2"></i>
                                    <span>q4_presentation.pdf</span>
                                </a>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">38 mins ago</span>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <img src="/assets/images/blocks/avatars/circle-big/avatar-f-3.png" alt="avatar-f-3" className="mr-3 w-3rem h-3rem" />
                            <div>
                                <span className="text-900 font-medium block mb-2">Annette Black</span>
                                <div className="text-700">
                                    added <span className="text-900 font-medium">Nico Greenberg</span> to <span className="text-primary">Watchlist Tier-1</span>.
                                </div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">1 day ago</span>
                    </li>
                    <li className="py-3 flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                        <div className="flex align-items-start mr-0 lg:mr-5">
                            <img src="/assets/images/blocks/avatars/circle-big/avatar-m-2.png" alt="avatar-m-2" className="mr-3 w-3rem h-3rem" />
                            <div>
                                <span className="text-900 font-medium block mb-2">Floyd Miles</span>
                                <div className="text-700">
                                    has refunded a blue t-shirt for <span className="text-primary">$79</span>.
                                </div>
                            </div>
                        </div>
                        <span className="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">4 days ago</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(ActivityLayout);
