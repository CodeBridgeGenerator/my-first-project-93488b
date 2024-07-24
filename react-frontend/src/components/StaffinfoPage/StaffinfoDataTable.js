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

const StaffinfoDataTable = ({
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

    const p_numberTemplate0 = (rowData, { rowIndex }) => <p>{rowData.empno}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.namenric}</p>;
    const p_numberTemplate3 = (rowData, { rowIndex }) => <p>{rowData.compcode}</p>;
    const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.compname}</p>;
    const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.deptcode}</p>;
    const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.deptdesc}</p>;
    const p_numberTemplate7 = (rowData, { rowIndex }) => <p>{rowData.sectcode}</p>;
    const pTemplate8 = (rowData, { rowIndex }) => <p>{rowData.sectdesc}</p>;
    const pTemplate9 = (rowData, { rowIndex }) => <p>{rowData.designation}</p>;
    const pTemplate10 = (rowData, { rowIndex }) => <p>{rowData.email}</p>;
    const pTemplate11 = (rowData, { rowIndex }) => <p>{rowData.resign}</p>;
    const pTemplate12 = (rowData, { rowIndex }) => <p>{rowData.supervisor}</p>;
    const p_numberTemplate13 = (rowData, { rowIndex }) => <p>{rowData.datejoin}</p>;
    const pTemplate14 = (rowData, { rowIndex }) => <p>{rowData.empgroup}</p>;
    const pTemplate15 = (rowData, { rowIndex }) => <p>{rowData.empgradecode}</p>;
    const pTemplate16 = (rowData, { rowIndex }) => <p>{rowData.terminationdate}</p>;
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!true} />;
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
                <Column field="empno" header="Empno" body={p_numberTemplate0} filter={selectedFilterFields.includes('empno')} hidden={selectedHideFields?.includes('empno')} sortable style={{ minWidth: '8rem' }} />
                <Column field="name" header="Name" body={pTemplate1} filter={selectedFilterFields.includes('name')} hidden={selectedHideFields?.includes('name')} sortable style={{ minWidth: '8rem' }} />
                <Column field="namenric" header="Namenric" body={pTemplate2} filter={selectedFilterFields.includes('namenric')} hidden={selectedHideFields?.includes('namenric')} sortable style={{ minWidth: '8rem' }} />
                <Column field="compcode" header="Compcode" body={p_numberTemplate3} filter={selectedFilterFields.includes('compcode')} hidden={selectedHideFields?.includes('compcode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="compname" header="Compname" body={pTemplate4} filter={selectedFilterFields.includes('compname')} hidden={selectedHideFields?.includes('compname')} sortable style={{ minWidth: '8rem' }} />
                <Column field="deptcode" header="Deptcode" body={pTemplate5} filter={selectedFilterFields.includes('deptcode')} hidden={selectedHideFields?.includes('deptcode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="deptdesc" header="Deptdesc" body={pTemplate6} filter={selectedFilterFields.includes('deptdesc')} hidden={selectedHideFields?.includes('deptdesc')} sortable style={{ minWidth: '8rem' }} />
                <Column field="sectcode" header="Sectcode" body={p_numberTemplate7} filter={selectedFilterFields.includes('sectcode')} hidden={selectedHideFields?.includes('sectcode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="sectdesc" header="Sectdesc" body={pTemplate8} filter={selectedFilterFields.includes('sectdesc')} hidden={selectedHideFields?.includes('sectdesc')} sortable style={{ minWidth: '8rem' }} />
                <Column field="designation" header="Designation" body={pTemplate9} filter={selectedFilterFields.includes('designation')} hidden={selectedHideFields?.includes('designation')} sortable style={{ minWidth: '8rem' }} />
                <Column field="email" header="Email" body={pTemplate10} filter={selectedFilterFields.includes('email')} hidden={selectedHideFields?.includes('email')} sortable style={{ minWidth: '8rem' }} />
                <Column field="resign" header="Resign" body={pTemplate11} filter={selectedFilterFields.includes('resign')} hidden={selectedHideFields?.includes('resign')} sortable style={{ minWidth: '8rem' }} />
                <Column field="supervisor" header="Supervisor" body={pTemplate12} filter={selectedFilterFields.includes('supervisor')} hidden={selectedHideFields?.includes('supervisor')} sortable style={{ minWidth: '8rem' }} />
                <Column field="datejoin" header="Datejoin" body={p_numberTemplate13} filter={selectedFilterFields.includes('datejoin')} hidden={selectedHideFields?.includes('datejoin')} sortable style={{ minWidth: '8rem' }} />
                <Column field="empgroup" header="Empgroup" body={pTemplate14} filter={selectedFilterFields.includes('empgroup')} hidden={selectedHideFields?.includes('empgroup')} sortable style={{ minWidth: '8rem' }} />
                <Column field="empgradecode" header="Empgradecode" body={pTemplate15} filter={selectedFilterFields.includes('empgradecode')} hidden={selectedHideFields?.includes('empgradecode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="terminationdate" header="Terminationdate" body={pTemplate16} filter={selectedFilterFields.includes('terminationdate')} hidden={selectedHideFields?.includes('terminationdate')} sortable style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload Staffinfo Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search Staffinfo" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default StaffinfoDataTable;
