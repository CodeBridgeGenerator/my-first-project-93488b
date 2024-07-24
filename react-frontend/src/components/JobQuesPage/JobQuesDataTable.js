import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import UploadService from '../../services/uploadService';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import DownloadCSV from '../../utils/DownloadCSV';

const JobQuesDataTable = ({
    items,
    fields,
    onEditRow,
    onRowDelete,
    onRowClick,
    searchDialog,
    setSearchDialog,
    showUpload,
    setShowUpload,
    showFilter,
    setShowFilter,
    showColumns,
    setShowColumns,
    onClickSaveFilteredfields,
    selectedFilterFields,
    setSelectedFilterFields,
    selectedHideFields,
    setSelectedHideFields,
    onClickSaveHiddenfields,
    loading
}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

    const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.type}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.fromService}</p>;
    const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.toService}</p>;
    const p_dateTemplate4 = (rowData, { rowIndex }) => <p>{new Date(rowData.start).toLocaleDateString()}</p>;
    const p_dateTemplate5 = (rowData, { rowIndex }) => <p>{new Date(rowData.end).toLocaleDateString()}</p>;
    const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.jobId}</p>;
    const pTemplate7 = (rowData, { rowIndex }) => <p>{rowData.status}</p>;
    const dropdownTemplate8 = (rowData, { rowIndex }) => <p>{rowData.dynaLoaderId?.name}</p>;
    const pTemplate9 = (rowData, { rowIndex }) => <p>{rowData.email}</p>;
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false} />;
    const paginatorRight = DownloadCSV({ data: items, fileName: 'download' });

    return (
        <>
            <DataTable
                value={items}
                ref={dt}
                removableSort
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
                alwaysShowPaginator={!urlParams.singleUsersId}
                loading={loading}
            >
                <Column field="name" header="Name" body={pTemplate0} filter={selectedFilterFields.includes('name')} hidden={selectedHideFields?.includes('name')} sortable style={{ minWidth: '8rem' }} />
                <Column field="type" header="Type" body={pTemplate1} filter={selectedFilterFields.includes('type')} hidden={selectedHideFields?.includes('type')} sortable style={{ minWidth: '8rem' }} />
                <Column field="fromService" header="From Service" body={pTemplate2} filter={selectedFilterFields.includes('fromService')} hidden={selectedHideFields?.includes('fromService')} sortable style={{ minWidth: '8rem' }} />
                <Column field="toService" header="To Service" body={pTemplate3} filter={selectedFilterFields.includes('toService')} hidden={selectedHideFields?.includes('toService')} sortable style={{ minWidth: '8rem' }} />
                <Column field="start" header="Start" body={p_dateTemplate4} filter={selectedFilterFields.includes('start')} hidden={selectedHideFields?.includes('start')} sortable style={{ minWidth: '8rem' }} />
                <Column field="end" header="End" body={p_dateTemplate5} filter={selectedFilterFields.includes('end')} hidden={selectedHideFields?.includes('end')} sortable style={{ minWidth: '8rem' }} />
                <Column field="jobId" header="Job Id" body={pTemplate6} filter={selectedFilterFields.includes('jobId')} hidden={selectedHideFields?.includes('jobId')} sortable style={{ minWidth: '8rem' }} />
                <Column field="status" header="Status" body={pTemplate7} filter={selectedFilterFields.includes('status')} hidden={selectedHideFields?.includes('status')} style={{ minWidth: '8rem' }} />
                <Column field="dynaLoaderId" header="DynaLoader Id" body={dropdownTemplate8} filter={selectedFilterFields.includes('dynaLoaderId')} hidden={selectedHideFields?.includes('dynaLoaderId')} style={{ minWidth: '8rem' }} />
                <Column field="email" header="Email" body={pTemplate9} filter={selectedFilterFields.includes('email')} hidden={selectedHideFields?.includes('email')} sortable style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload JobQues Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search JobQues" visible={searchDialog} onHide={() => setSearchDialog(false)}>
                Search
            </Dialog>
            <Dialog header="Filter Users" visible={showFilter} onHide={() => setShowFilter(false)}>
                <div className="card flex justify-content-center">
                    <MultiSelect value={selectedFilterFields} onChange={(e) => setSelectedFilterFields(e.value)} options={fields} optionLabel="name" optionValue="value" filter placeholder="Select Fields" maxSelectedLabels={6} className="w-full md:w-20rem" />
                </div>
                <Button
                    text
                    label="save as pref"
                    onClick={() => {
                        console.log(selectedFilterFields);
                        onClickSaveFilteredfields(selectedFilterFields);
                        setSelectedFilterFields(selectedFilterFields);
                        setShowFilter(false);
                    }}
                ></Button>
            </Dialog>

            <Dialog header="Hide Columns" visible={showColumns} onHide={() => setShowColumns(false)}>
                <div className="card flex justify-content-center">
                    <MultiSelect value={selectedHideFields} onChange={(e) => setSelectedHideFields(e.value)} options={fields} optionLabel="name" optionValue="value" filter placeholder="Select Fields" maxSelectedLabels={6} className="w-full md:w-20rem" />
                </div>
                <Button
                    text
                    label="save as pref"
                    onClick={() => {
                        console.log(selectedHideFields);
                        onClickSaveHiddenfields(selectedHideFields);
                        setSelectedHideFields(selectedHideFields);
                        setShowColumns(false);
                    }}
                ></Button>
            </Dialog>
        </>
    );
};

export default JobQuesDataTable;
