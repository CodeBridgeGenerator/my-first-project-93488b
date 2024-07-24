import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

const StatsLayout = (props) => {
    return (
        <>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-card shadow-2 border-round">
                    <div className="p-3 flex align-items-start">
                        <img src="/assets/images/blocks/crypto/btc.png" alt="btc" style={{ width: '32px', height: '32px' }} className="mr-2" />
                        <div>
                            <span className="text-700">Bitcoin</span>
                            <div className="text-green-500 text-xl mt-2">+0.53%</div>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-500 border-round ml-auto">0.0045 BTC</div>
                    </div>
                    <img src="/assets/images/blocks/graphs/graph-1.svg" alt="graph-1" className="w-full" />
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-card shadow-2 border-round">
                    <div className="p-3 flex align-items-start">
                        <img src="/assets/images/blocks/crypto/eth.png" alt="eth" style={{ width: '32px', height: '32px' }} className="mr-2" />
                        <div>
                            <span className="text-700">Ethereum</span>
                            <div className="text-green-500 text-xl mt-2">+3.52%</div>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-500 border-round ml-auto">25.0985 ETH</div>
                    </div>
                    <img src="/assets/images/blocks/graphs/graph-2.svg" alt="graph-2" className="w-full" />
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-card shadow-2 border-round">
                    <div className="p-3 flex align-items-start">
                        <img src="/assets/images/blocks/crypto/btc.png" alt="btc" style={{ width: '32px', height: '32px' }} className="mr-2" />
                        <div>
                            <span className="text-700">Dogecoin</span>
                            <div className="text-pink-500 text-xl mt-2">-0.32%</div>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-500 border-round ml-auto">59000 DOGE</div>
                    </div>
                    <img src="/assets/images/blocks/graphs/graph-3.svg" alt="graph-3" className="w-full" />
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-card shadow-2 border-round">
                    <div className="p-3 flex align-items-start">
                        <img src="/assets/images/blocks/crypto/xlm.png" alt="xlm" style={{ width: '32px', height: '32px' }} className="mr-2" />
                        <div>
                            <span className="text-700">Stellar</span>
                            <div className="text-green-500 text-xl mt-2">+0.99%</div>
                        </div>
                        <div className="p-2 bg-indigo-50 text-indigo-500 border-round ml-auto">1400 XLM</div>
                    </div>
                    <img src="/assets/images/blocks/graphs/graph-4.svg" alt="graph-4" className="w-full" />
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

export default connect(mapState, mapDispatch)(StatsLayout);
