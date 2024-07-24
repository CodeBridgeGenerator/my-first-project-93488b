import React, { useRef } from 'react';
import { connect } from 'react-redux';
import StatsLayout from './Stats/StatsLayout';
import TrafficLayout from './Traffic/TrafficLayout';
import GoalsLayout from './Goals/GoalsLayout';
import PerformanceLayout from './StaffPerformance/PerformanceLayout';
import ActivityLayout from './Activity/ActivityLayout';
import NotificationsLayout from './Notifications/NotificationsLayout';
import LearnMoreLayout from './LearnMore/LearnMoreLayout';
import LineGraphLayout from './LineGraph/LineGraphLayout';

const DynamicDashboards = () => {
    return (
        <div className="">
            <h3 className="m-4">CodeBridge Ai app is live</h3>
            <div className="grid w-full flex justify-content-center">
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Users Management</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Admin Controls</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Data Management</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Document Manager</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Gen Ai Assistant</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Messaging</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Bug Tracking System</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-4">
                    <div className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom" style={{ height: '10rem' }}>
                        <div className="text-900 font-medium text-lg">Company Data</div>
                    </div>
                </div>
            </div>
            {/* <StatsLayout /> */}
            {/* <TrafficLayout /> */}
            {/* <GoalsLayout /> */}
            {/* <PerformanceLayout /> */}
            {/* <LineGraphLayout /> */}
            {/* <ActivityLayout /> */}
            {/* <NotificationsLayout /> */}
            {/* <LearnMoreLayout /> */}
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

export default connect(mapState, mapDispatch)(DynamicDashboards);
