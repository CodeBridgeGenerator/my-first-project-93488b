import React from 'react';
import { connect } from 'react-redux';

const LoadingWrapper = ({ isLoading }) => {
    return isLoading ? (
        <div className="flex flex-column align-items-center justify-content-center" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '3em', color: '#0089ff' }}></i>
        </div>
    ) : null;
};

const mapState = (state) => {
    const isLoading = state.loading;
    return { isLoading };
};

export default connect(mapState)(LoadingWrapper);
