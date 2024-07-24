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

const UsersDataTable = ({
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
    onClickSaveHiddenfields
}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

    const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.email}</p>;
    const p_booleanTemplate3 = (rowData, { rowIndex }) => <p>{String(rowData.status)}</p>;
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? 'pi-check' : 'pi-pencil'}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? 'p-button-success' : 'p-button-warning'}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
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
            >
                <Column field="name" header="Name" body={pTemplate0} filter={selectedFilterFields.includes('name')} hidden={selectedHideFields?.includes('name')} sortable style={{ minWidth: '8rem' }} />
                <Column field="email" header="Email" body={pTemplate1} filter={selectedFilterFields.includes('email')} hidden={selectedHideFields?.includes('email')} sortable style={{ minWidth: '8rem' }} />
                <Column field="status" header="Status" body={p_booleanTemplate3} filter={selectedFilterFields.includes('status')} hidden={selectedHideFields?.includes('status')} style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                {/* <Column header="Delete" body={deleteTemplate} /> */}
            </DataTable>
            <Dialog header="Upload Users Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>
            <Dialog header="Search Users" visible={searchDialog} onHide={() => setSearchDialog(false)}>
                SearchService
            </Dialog>
            <Dialog header="Filter Users" visible={showFilter} onHide={() => setShowFilter(false)}>
                <div className="card flex justify-content-center">
                    <MultiSelect value={selectedFilterFields} onChange={(e) => setSelectedFilterFields(e.value)} options={fields} optionLabel="name" optionValue="value" filter placeholder="Select Fields" maxSelectedLabels={6} className="w-full md:w-20rem" />
                </div>
                <Button
                    text
                    label="save"
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
                    label="save"
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

export default UsersDataTable;
