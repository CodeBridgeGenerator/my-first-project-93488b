import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Image } from 'primereact/image';

const TrafficLayout = (props) => {
    return (
        <div className="col-12 lg:col-6">
            <div className="shadow-2 surface-card border-round p-3">
                <div className="flex align-items-center justify-content-between">
                    <span className="text-xl font-medium text-900">Traffic Distribution</span>
                </div>
                <div className="mt-3">
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">12.40K</div>
                                <span className="font-medium text-600">Hot & Cold</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">10.20K</div>
                                <span className="font-medium text-600">Can & Bottle</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">5.60K</div>
                                <span className="font-medium text-600">COMBO</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">23.53K</div>
                                <span className="font-medium text-600">COMBO 2</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">16.70K</div>
                                <span className="font-medium text-600">COMBO 2 DG</span>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 text-center">
                            <div className="text-center border-1 surface-border border-round p-4">
                                <Image src="/assets/images/machines/hotncold.jpg" width="50"></Image>
                                <div className="text-900 text-2xl font-700 my-3 font-bold">16.50K</div>
                                <span className="font-medium text-600">COMBO 3</span>
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapState, mapDispatch)(TrafficLayout);
