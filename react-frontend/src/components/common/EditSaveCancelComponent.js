import React from 'react';
import { Button } from 'primereact/button';
const EditSaveCancelComponent = ({ isEdit, onEdit, onSave, onCancel, saveDisabled, editClassName, saveClassName, cancelClassName }) => {
    return !isEdit ? (
        <div>
            <Button label={isEdit ? 'Save' : 'Edit'} className={`p-button-sm ${isEdit ? '' : 'p-button-outlined'} ${editClassName || ''}`} onClick={onEdit} role="edit-button" />
        </div>
    ) : (
        <div className="flex">
            <Button label="Save" className={`mr-2 p-button-sm ${isEdit ? '' : 'p-button-outlined'} ${saveClassName || ''}`} onClick={onSave} disabled={saveDisabled} role="save-button" />
            <Button label="Cancel" className={`p-button-sm ${isEdit ? '' : 'p-button-outlined'} ${cancelClassName || ''}`} onClick={onCancel} role="cancel-button" />
        </div>
    );
};

export default EditSaveCancelComponent;
