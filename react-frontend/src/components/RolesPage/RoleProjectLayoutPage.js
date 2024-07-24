import React from 'react';
import ProjectLayout from '../Layouts/ProjectLayout';
import { connect } from 'react-redux';
import RolesPage from './RolesPage';

const RoleProjectLayoutPage = (props) => {
    return (
        <ProjectLayout>
            <RolesPage />
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    const { selectedUser } = state.user;
    return { user, isLoggedIn, selectedUser };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(RoleProjectLayoutPage);
