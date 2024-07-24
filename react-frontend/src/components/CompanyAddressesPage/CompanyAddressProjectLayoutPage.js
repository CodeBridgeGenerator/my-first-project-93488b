import React from 'react';
import ProjectLayout from '../Layouts/ProjectLayout';
import { connect } from 'react-redux';
import CompanyAddressesPage from './CompanyAddressesPage';

const CompanyAddressProjectLayoutPage = (props) => {
    return (
        <ProjectLayout>
            <CompanyAddressesPage />
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

export default connect(mapState, mapDispatch)(CompanyAddressProjectLayoutPage);
