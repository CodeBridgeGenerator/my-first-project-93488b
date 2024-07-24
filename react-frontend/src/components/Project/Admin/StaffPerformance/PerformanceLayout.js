import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';

const PerformanceLayout = (props) => {
    return (
        <>
            <div className="col-12">
                <div className="surface-ground">
                    <div className="grid">
                        <div className="col-12 lg:col-4 p-2">
                            <div className="shadow-2 surface-card border-round p-4 h-full">
                                <div className="flex align-items-start mb-5">
                                    <img src="/assets/images/blocks/avatars/circle-big/avatar-m-1.png" alt="avatar-m-1" width="56" height="56" />
                                    <div className="ml-3">
                                        <span className="block text-900 mb-1 text-xl font-medium">Cameron Williamson</span>
                                        <p className="text-600 mt-0 mb-0">Marketing Coordinator</p>
                                    </div>
                                </div>
                                <ul className="list-none p-0 m-0">
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-twitter mr-2"></i>
                                                <span className="font-medium text-900">Twitter</span>
                                            </span>
                                            <span className="text-cyan-500 font-medium">34.00%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-cyan-500 h-full" style={{ width: '34%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-facebook mr-2"></i>
                                                <span className="font-medium text-900">Facebook</span>
                                            </span>
                                            <span className="text-indigo-500 font-medium">45.86%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-indigo-500 h-full" style={{ width: '45%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-google mr-2"></i>
                                                <span className="font-medium text-900">Google</span>
                                            </span>
                                            <span className="text-orange-500 font-medium">79.00%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-orange-500 h-full" style={{ width: '79%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 lg:col-4 p-2">
                            <div className="shadow-2 surface-card border-round p-4 h-full">
                                <div className="flex align-items-start mb-5">
                                    <img src="/assets/images/blocks/avatars/circle-big/avatar-f-2.png" alt="avatar-f-2" width="56" height="56" />
                                    <div className="ml-3">
                                        <span className="block text-900 mb-1 text-xl font-medium">Kathryn Murphy</span>
                                        <p className="text-600 mt-0 mb-0">Sales Manager</p>
                                    </div>
                                </div>
                                <ul className="list-none p-0 m-0">
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-twitter mr-2"></i>
                                                <span className="font-medium text-900">Twitter</span>
                                            </span>
                                            <span className="text-cyan-500 font-medium">64.47%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-cyan-500 h-full" style={{ width: '64%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-facebook mr-2"></i>
                                                <span className="font-medium text-900">Facebook</span>
                                            </span>
                                            <span className="text-indigo-500 font-medium">75.67%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-indigo-500 h-full" style={{ width: '75%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-google mr-2"></i>
                                                <span className="font-medium text-900">Google</span>
                                            </span>
                                            <span className="text-orange-500 font-medium">45.00%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-orange-500 h-full" style={{ width: '45%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 lg:col-4 p-2">
                            <div className="shadow-2 surface-card border-round p-4 h-full">
                                <div className="flex align-items-start mb-5">
                                    <img src="/assets/images/blocks/avatars/circle-big/avatar-m-3.png" alt="avatar-m-3" width="56" height="56" />
                                    <div className="ml-3">
                                        <span className="block text-900 mb-1 text-xl font-medium">Darrell Steward</span>
                                        <p className="text-600 mt-0 mb-0">Web Designer</p>
                                    </div>
                                </div>
                                <ul className="list-none p-0 m-0">
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-twitter mr-2"></i>
                                                <span className="font-medium text-900">Twitter</span>
                                            </span>
                                            <span className="text-cyan-500 font-medium">23.55%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-cyan-500 h-full" style={{ width: '34%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li className="mb-5">
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-facebook mr-2"></i>
                                                <span className="font-medium text-900">Facebook</span>
                                            </span>
                                            <span className="text-indigo-500 font-medium">78.65%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-indigo-500 h-full" style={{ width: '45%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex justify-content-between align-items-center">
                                            <span className="text-900 inline-flex justify-content-between align-items-center">
                                                <i className="pi pi-google mr-2"></i>
                                                <span className="font-medium text-900">Google</span>
                                            </span>
                                            <span className="text-orange-500 font-medium">86.54%</span>
                                        </div>
                                        <div className="surface-300 w-full mt-2" style={{ height: '7px', borderRadius: '4px' }}>
                                            <div className="bg-orange-500 h-full" style={{ width: '79%', borderRadius: '4px' }}></div>
                                        </div>
                                    </li>
                                </ul>
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
    return { user };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(PerformanceLayout);
