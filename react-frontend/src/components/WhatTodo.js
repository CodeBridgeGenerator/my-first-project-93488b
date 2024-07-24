import React from 'react';
import { connect } from 'react-redux';

const WhatToDoPage = (props) => {
    return (
        <div className="card p-0 min-w-max overflow-hidden">
            <div
                className="flex justify-content-between p-4 mb-4 shadow-2"
                style={{
                    backgroundImage: 'linear-gradient(to right top, #d30078, #d1008f, #c600ab, #af00ca, #8312eb)'
                }}
            >
                <div className="flex align-items-center text-white">
                    <p className="text-4xl text-white">What do you want to do today?</p>
                </div>
            </div>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <h3 className="mb-0 ml-2">Most Recent Users</h3>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(WhatToDoPage);
