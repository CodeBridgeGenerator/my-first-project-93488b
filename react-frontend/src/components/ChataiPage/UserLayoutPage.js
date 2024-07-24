// REACT 18 TEMPLATE - <Service>Page.js

import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ProjectLayout from '../Layouts/ProjectLayout';
import { Skeleton } from 'primereact/skeleton';
import ChataiPage from './ChataiPage';

const ChataiUserLayoutPage = (props) => {
    const [loading, setLoading] = useState(false);
    return (
        <ProjectLayout>
            {loading ? (
                <Skeleton width="100%" height="20rem" />
            ) : (
                <div className="card p-0 overflow-hidden " style={{ minHeight: '80%', position: 'relative' }}>
                    <ChataiPage />
                </div>
            )}
        </ProjectLayout>
    );
};
const mapState = (state) => ({
    //
});
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(ChataiUserLayoutPage);
