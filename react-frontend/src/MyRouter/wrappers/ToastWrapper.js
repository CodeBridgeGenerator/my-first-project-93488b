import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'primereact/toast';
const ToastWrapper = ({ _stamp, type, title, message, life }) => {
    let toast = useRef(null);

    useEffect(() => {
        if (message) showToast(type, title, message, life);
    }, [_stamp]); // stamp to trigger effect everytime
    const showToast = (type, title, message, life) => {
        toast.current.show({ severity: type, summary: title, detail: message, life: life || 5000 });
    };
    return <Toast ref={toast} style={{ zIndex: 1200 }} />;
};

const mapState = (state) => {
    const { type, title, message, life, _stamp } = state.toast;
    return { type, title, message, life, _stamp };
};

export default connect(mapState)(ToastWrapper);
