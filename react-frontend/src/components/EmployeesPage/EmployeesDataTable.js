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

const EmployeesDataTable = ({
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

    const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.empNo}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.fullname}</p>;
    const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.userEmail}</p>;
    const dropdownTemplate4 = (rowData, { rowIndex }) => <p>{rowData.company?.name}</p>;
    const dropdownTemplate5 = (rowData, { rowIndex }) => <p>{rowData.department?.name}</p>;
    const dropdownTemplate6 = (rowData, { rowIndex }) => <p>{rowData.section?.name}</p>;
    const dropdownTemplate7 = (rowData, { rowIndex }) => <p>{rowData.position?.name}</p>;
    const dropdownTemplate8 = (rowData, { rowIndex }) => <p>{rowData.supervisor?.name}</p>;
    const p_calendarTemplate9 = (rowData, { rowIndex }) => <p>{rowData.dateJoined}</p>;
    const p_calendarTemplate10 = (rowData, { rowIndex }) => <p>{rowData.dateTerminated}</p>;
    const pTemplate11 = (rowData, { rowIndex }) => <p>{rowData.resigned}</p>;
    const pTemplate12 = (rowData, { rowIndex }) => <p>{rowData.empGroup}</p>;
    const pTemplate13 = (rowData, { rowIndex }) => <p>{rowData.empCode}</p>;
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false} />;
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
                <Column field="empNo" header="Emp No" body={pTemplate0} filter={selectedFilterFields.includes('empNo')} hidden={selectedHideFields?.includes('empNo')} sortable style={{ minWidth: '8rem' }} />
                <Column field="name" header="Name" body={pTemplate1} filter={selectedFilterFields.includes('name')} hidden={selectedHideFields?.includes('name')} sortable style={{ minWidth: '8rem' }} />
                <Column field="fullname" header="Fullname" body={pTemplate2} filter={selectedFilterFields.includes('fullname')} hidden={selectedHideFields?.includes('fullname')} sortable style={{ minWidth: '8rem' }} />
                <Column field="userEmail" header="User Email" body={pTemplate3} filter={selectedFilterFields.includes('userEmail')} hidden={selectedHideFields?.includes('userEmail')} sortable style={{ minWidth: '8rem' }} />
                <Column field="company" header="Company" body={dropdownTemplate4} filter={selectedFilterFields.includes('company')} hidden={selectedHideFields?.includes('company')} style={{ minWidth: '8rem' }} />
                <Column field="department" header="Department" body={dropdownTemplate5} filter={selectedFilterFields.includes('department')} hidden={selectedHideFields?.includes('department')} style={{ minWidth: '8rem' }} />
                <Column field="section" header="Section" body={dropdownTemplate6} filter={selectedFilterFields.includes('section')} hidden={selectedHideFields?.includes('section')} style={{ minWidth: '8rem' }} />
                <Column field="position" header="Position" body={dropdownTemplate7} filter={selectedFilterFields.includes('position')} hidden={selectedHideFields?.includes('position')} style={{ minWidth: '8rem' }} />
                <Column field="supervisor" header="Supervisor" body={dropdownTemplate8} filter={selectedFilterFields.includes('supervisor')} hidden={selectedHideFields?.includes('supervisor')} style={{ minWidth: '8rem' }} />
                <Column field="dateJoined" header="Date Joined" body={p_calendarTemplate9} filter={selectedFilterFields.includes('dateJoined')} hidden={selectedHideFields?.includes('dateJoined')} sortable style={{ minWidth: '8rem' }} />
                <Column field="dateTerminated" header="Date Terminated" body={p_calendarTemplate10} filter={selectedFilterFields.includes('dateTerminated')} hidden={selectedHideFields?.includes('dateTerminated')} sortable style={{ minWidth: '8rem' }} />
                <Column field="resigned" header="Resigned" body={pTemplate11} filter={selectedFilterFields.includes('resigned')} hidden={selectedHideFields?.includes('resigned')} sortable style={{ minWidth: '8rem' }} />
                <Column field="empGroup" header="Emp Group" body={pTemplate12} filter={selectedFilterFields.includes('empGroup')} hidden={selectedHideFields?.includes('empGroup')} sortable style={{ minWidth: '8rem' }} />
                <Column field="empCode" header="Emp Code" body={pTemplate13} filter={selectedFilterFields.includes('empCode')} hidden={selectedHideFields?.includes('empCode')} sortable style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload Employees Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search Employees" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default EmployeesDataTable;
