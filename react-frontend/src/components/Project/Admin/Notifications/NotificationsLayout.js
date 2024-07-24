import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

const NotificationsLayout = (props) => {
    const menu2 = useRef(null);
    const items = [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];

    return (
        <>
            <div className="col-12 lg:col-6">
                <div className="surface-card shadow-2 border-round p-4 h-full">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="text-900 font-medium text-xl">Notifications</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-button-rounded" onClick={(event) => menu2.current.toggle(event)} />
                            <Menu ref={menu2} popup model={items} />
                        </div>
                    </div>

                    <span className="block text-600 font-medium mb-3">TODAY</span>
                    <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500"></i>
                            </div>
                            <span className="text-900 line-height-3 font-medium">
                                Richard Jones
                                <span className="text-700 font-normal">
                                    {' '}
                                    has purchased a blue t-shirt for <span className="text-primary font-medium">$79</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-download text-xl text-orange-500"></i>
                            </div>
                            <span className="text-700 line-height-3">
                                Your request for withdrawal of <span className="text-primary font-medium">$2500</span> has been initiated.
                            </span>
                        </li>
                    </ul>

                    <span className="block text-600 font-medium mb-3">YESTERDAY</span>
                    <ul className="p-0 m-0 list-none">
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-dollar text-xl text-blue-500"></i>
                            </div>
                            <span className="text-900 line-height-3 font-medium">
                                Keyser Wick
                                <span className="text-700 font-normal">
                                    {' '}
                                    has purchased a black jacket for <span className="text-primary font-medium">$59</span>
                                </span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-question text-xl text-pink-500"></i>
                            </div>
                            <span className="text-900 line-height-3 font-medium">
                                Jane Davis
                                <span className="text-700 font-normal"> has posted a new questions about your product.</span>
                            </span>
                        </li>
                        <li className="flex align-items-center py-2">
                            <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-green-100 border-circle mr-3 flex-shrink-0">
                                <i className="pi pi-arrow-up text-xl text-green-500"></i>
                            </div>
                            <span className="text-900 line-height-3 font-medium">
                                Claire Smith
                                <span className="text-700 font-normal"> has upvoted your store along with a comment.</span>
                            </span>
                        </li>
                    </ul>
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

export default connect(mapState, mapDispatch)(NotificationsLayout);
