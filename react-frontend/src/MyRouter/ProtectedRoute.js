import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, redirectPath }) => {
    if (!isLoggedIn) return <Navigate to={redirectPath} replace />;
    return children ? children : <Outlet />;
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};

export default connect(mapState, null)(ProtectedRoute);
