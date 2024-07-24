import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const AreYouSureDialog = (props) => {
    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="Yes" className=" no-focus-effect" onClick={props.onYes} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    return (
        <Dialog header={props.header} visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: '40vw' }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <p className="m-0" role="dialog">
                {props.body || 'Are you sure?'}
            </p>
        </Dialog>
    );
};

export default AreYouSureDialog;
