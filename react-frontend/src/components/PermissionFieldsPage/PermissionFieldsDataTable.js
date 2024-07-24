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

const PermissionFieldsDataTable = ({
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

    const dropdownTemplate0 = (rowData, { rowIndex }) => <p>{rowData.servicePermissionId?.service}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.fieldName}</p>;
    const p_booleanTemplate2 = (rowData, { rowIndex }) => <p>{String(rowData.onCreate)}</p>;
    const p_booleanTemplate3 = (rowData, { rowIndex }) => <p>{String(rowData.onUpdate)}</p>;
    const p_booleanTemplate4 = (rowData, { rowIndex }) => <p>{String(rowData.onDetail)}</p>;
    const p_booleanTemplate5 = (rowData, { rowIndex }) => <p>{String(rowData.onTable)}</p>;
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!true} />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={() => exportCSV()} disabled={!true} />;
    const exportCSV = () => {
        dt.current?.exportCSV();
    };

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
                <Column field="servicePermissionId" header="ServicePermissionId" body={dropdownTemplate0} filter={selectedFilterFields.includes('servicePermissionId')} hidden={selectedHideFields?.includes('servicePermissionId')} style={{ minWidth: '8rem' }} />
                <Column field="fieldName" header="Field Name" body={pTemplate1} filter={selectedFilterFields.includes('fieldName')} hidden={selectedHideFields?.includes('fieldName')} sortable style={{ minWidth: '8rem' }} />
                <Column field="onCreate" header="OnCreate" body={p_booleanTemplate2} filter={selectedFilterFields.includes('onCreate')} hidden={selectedHideFields?.includes('onCreate')} sortable style={{ minWidth: '8rem' }} />
                <Column field="onUpdate" header="OnUpdate" body={p_booleanTemplate3} filter={selectedFilterFields.includes('onUpdate')} hidden={selectedHideFields?.includes('onUpdate')} sortable style={{ minWidth: '8rem' }} />
                <Column field="onDetail" header="OnDetail" body={p_booleanTemplate4} filter={selectedFilterFields.includes('onDetail')} hidden={selectedHideFields?.includes('onDetail')} sortable style={{ minWidth: '8rem' }} />
                <Column field="onTable" header="OnTable" body={p_booleanTemplate5} filter={selectedFilterFields.includes('onTable')} hidden={selectedHideFields?.includes('onTable')} style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload PermissionFields Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search PermissionFields" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default PermissionFieldsDataTable;
