import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import moment from 'moment';

const PromptsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
    const [refresh, setRefresh] = useState(false);
    const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.sessionid}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.chatAiId?.name}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.configid?.name}</p>;
    const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.prompt}</p>;
    const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.responseText}</p>;
    const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.systemId}</p>;
    const pTemplate7 = (rowData, { rowIndex }) => <p>{rowData.type}</p>;
    const pTemplate8 = (rowData, { rowIndex }) => <p>{rowData.role}</p>;
    const pTemplate9 = (rowData, { rowIndex }) => <p>{rowData.model}</p>;
    const pTemplate10 = (rowData, { rowIndex }) => <p>{rowData.stopReason}</p>;
    const pTemplate11 = (rowData, { rowIndex }) => <p>{rowData.stopSequence}</p>;
    const badgeTemplate12 = (rowData, { rowIndex }) => <Badge value={rowData.inputTokens}></Badge>;
    const badgeTemplate13 = (rowData, { rowIndex }) => <Badge value={rowData.outputTokens}></Badge>;
    const pTemplate14 = (rowData, { rowIndex }) => <p className=" flex justify-content-end mr-5">RM{isNaN(rowData?.cost) ? '0.00' : rowData?.cost?.toFixed(2)}</p>;
    const tickTemplate15 = (rowData, { rowIndex }) => <i className={`flex justify-content-center pi ${rowData.status ? 'pi-check' : 'pi-times'}`}></i>;
    const pTemplate16 = (rowData, { rowIndex }) => <p>{rowData.error ? rowData.error : 'none'}</p>;

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text onClick={() => setRefresh(!refresh)} />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={() => exportCSV()} />;
    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    return (
        <DataTable
            ref={dt}
            value={items}
            onRowClick={onRowClick}
            scrollable
            rowHover
            stripedRows
            paginator
            rows={10}
            rowsPerPageOptions={[10, 50, 250, 500]}
            size={'small'}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            rowClassName="cursor-pointer"
        >
            {/* <Column
        field="sessionid"
        header="Sessionid"
        body={pTemplate0}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="chatAiId"
        header="ChatAi"
        body={pTemplate1}
        sortable
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="configid"
        header="Config"
        body={pTemplate2}
        sortable
        style={{ minWidth: "8rem" }}
      /> */}
            <Column field="prompt" header="Engineered Prompts" body={pTemplate3} style={{ minWidth: '8rem' }} />
            {/* <Column
        field="responseText"
        header="Response Text"
        body={pTemplate5}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="systemId"
        header="System Id"
        body={pTemplate6}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="type"
        header="Type"
        body={pTemplate7}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="role"
        header="Role"
        body={pTemplate8}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="model"
        header="Model"
        body={pTemplate9}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="stopReason"
        header="Stop Reason"
        body={pTemplate10}
        style={{ minWidth: "8rem" }}
      /> */}
            {/* <Column
        field="stopSequence"
        header="Stop Sequence"
        body={pTemplate11}
        style={{ minWidth: "8rem" }}
      /> */}
            <Column field="inputTokens" header="inputTokens" body={badgeTemplate12} style={{ minWidth: '8rem' }} />
            <Column field="outputTokens" header="outputTokens" body={badgeTemplate13} style={{ minWidth: '8rem' }} />
            <Column field="cost" header="cost" body={pTemplate14} style={{ minWidth: '8rem' }} />
            <Column field="status" header="status" body={tickTemplate15} sortable style={{ minWidth: '8rem' }} />
            <Column field="error" header="error" body={pTemplate16} style={{ minWidth: '8rem' }} />

            {/* <Column header="Edit" body={editTemplate} />
      <Column header="Delete" body={deleteTemplate} /> */}
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: '8rem' }} />
            {/* <Column
        field="updatedAt"
        header="updated"
        body={pUpdatedAt}
        style={{ minWidth: "8rem" }}
      /> */}
            <Column field="createdBy" header="createdBy" body={pCreatedBy} style={{ minWidth: '8rem' }} />
            {/* <Column
        field="updatedBy"
        header="updatedBy"
        body={pUpdatedBy}
        style={{ minWidth: "8rem" }}
      /> */}
        </DataTable>
    );
};

export default PromptsDataTable;
