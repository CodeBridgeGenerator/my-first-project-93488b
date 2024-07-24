import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

const LearnMoreLayout = (props) => {
    return (
        <>
            <div className="col-12 lg:col-4">
                <div className="surface-card border-round shadow-2 p-4 text-center">
                    <img src="/assets/images/blocks/illustration/windows.svg" alt="windows" className="mx-auto block mb-4" />
                    <div className="text-900 font-medium mb-2 text-xl">Title Placeholder</div>
                    <p className="mt-0 mb-4 p-0 line-height-3">Nunc mi ipsum faucibus vitae aliquet nec. Lacus sed viverra tellus in hac habitasse platea dictumst.</p>
                    <Button label="Learn More" icon="pi pi-arrow-right p-button-rounded" />
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="surface-card border-round shadow-2 p-4 text-center">
                    <img src="/assets/images/blocks/illustration/security.svg" alt="security" className="mx-auto block mb-4" />
                    <div className="text-900 font-medium mb-2 text-xl">Title Placeholder</div>
                    <p className="mt-0 mb-4 p-0 line-height-3">Nunc mi ipsum faucibus vitae aliquet nec. Lacus sed viverra tellus in hac habitasse platea dictumst.</p>
                    <Button label="Learn More" icon="pi pi-arrow-right p-button-rounded" />
                </div>
            </div>
            <div className="col-12 lg:col-4">
                <div className="surface-card border-round shadow-2 p-4 text-center">
                    <img src="/assets/images/blocks/illustration/live-collaboration.svg" alt="live-collaboration" className="mx-auto block mb-4" />
                    <div className="text-900 font-medium mb-2 text-xl">Title Placeholder</div>
                    <p className="mt-0 mb-4 p-0 line-height-3">Nunc mi ipsum faucibus vitae aliquet nec. Lacus sed viverra tellus in hac habitasse platea dictumst.</p>
                    <Button label="Learn More" icon="pi pi-arrow-right p-button-rounded" />
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

export default connect(mapState, mapDispatch)(LearnMoreLayout);
