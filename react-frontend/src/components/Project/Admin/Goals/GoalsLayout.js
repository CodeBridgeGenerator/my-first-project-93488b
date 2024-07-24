import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

const GoalsLayout = (props) => {
    return (
        <>
            <div className="col-12 lg:col-6">
                <div className="surface-card shadow-2 border-round p-4">
                    <div className="flex align-items-center justify-content-between mb-4">
                        <span className="text-xl font-medium text-900">Quarter Goals</span>
                    </div>
                    <div className="surface-border border-1 border-round p-3 mb-4">
                        <span className="text-900 font-medium text-3xl">
                            85% <span className="text-600">(2125/2500)</span>
                        </span>
                        <ul className="mt-3 list-none p-0 mx-0 flex">
                            <li style={{ height: '1rem' }} className="flex-1 bg-indigo-500 border-round-left"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-blue-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-orange-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-purple-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-yellow-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-cyan-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-pink-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-teal-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 bg-red-500"></li>
                            <li style={{ height: '1rem' }} className="flex-1 surface-500 border-round-right"></li>
                        </ul>
                    </div>
                    <ul className="mt-4 list-none p-0 mx-0">
                        <li className="flex align-items-center pb-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-indigo-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Incoming Check</span>
                            <span className="text-600 text-xl font-medium ml-auto">152</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-blue-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Dismantling</span>
                            <span className="text-600 text-xl font-medium ml-auto">63</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-orange-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Tagging</span>
                            <span className="text-600 text-xl font-medium ml-auto">23</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-purple-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Modification</span>
                            <span className="text-600 text-xl font-medium ml-auto">42</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-yellow-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Painting/ Body Works</span>
                            <span className="text-600 text-xl font-medium ml-auto">134</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-green-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Assembly</span>
                            <span className="text-600 text-xl font-medium ml-auto">89</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-pink-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Repair</span>
                            <span className="text-600 text-xl font-medium ml-auto">3</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-teal-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">QC</span>
                            <span className="text-600 text-xl font-medium ml-auto">81</span>
                        </li>
                        <li className="flex align-items-center py-3">
                            <span style={{ width: '1rem', height: '1rem' }} className="border-round bg-red-500 mr-3 flex-shrink-0"></span>
                            <span className="text-xl font-medium text-90">Outgoing Station</span>
                            <span className="text-600 text-xl font-medium ml-auto">19</span>
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

export default connect(mapState, mapDispatch)(GoalsLayout);
