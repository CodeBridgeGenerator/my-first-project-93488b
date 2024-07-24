import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import moment from 'moment';

const ChataiDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.description}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.serviceName}</p>;

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} size={'small'} rowClassName="cursor-pointer">
            <Column field="name" header="Name" body={pTemplate0} sortable style={{ minWidth: '8rem' }} />
            <Column field="description" header="Description" body={pTemplate1} style={{ minWidth: '8rem' }} />
            <Column field="serviceName" header="Service Name" body={pTemplate2} sortable style={{ minWidth: '8rem' }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: '8rem' }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: '8rem' }} />
            <Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: '8rem' }} />
            <Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: '8rem' }} />
        </DataTable>
    );
};

export default ChataiDataTable;
