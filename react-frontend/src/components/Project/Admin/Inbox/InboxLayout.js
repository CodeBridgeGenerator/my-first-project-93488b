import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

const AlertLayout = (props) => {
    return <></>;
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(AlertLayout);
