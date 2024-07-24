import { useEffect } from 'react';
import { connect } from 'react-redux';
import client from '../../services/restClient';

const StartupWrapper = (props) => {
    const user = client.service('users');
    user.on('patched', (message) => {
        console.log('message patched', message);
    });

    useEffect(() => {
        // runs once
        props.reAuth().catch((error) => {
            console.log('error', error);
        });
    }, []);

    return null;
};

const mapState = (state) => {
    const { isLoggedIn, user } = state.auth;
    return { isLoggedIn, user };
};
const mapDispatch = (dispatch) => ({
    reAuth: () => dispatch.auth.reAuth()
});

export default connect(mapState, mapDispatch)(StartupWrapper);
