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

const UserPhonesDataTable = ({
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

    const dropdownTemplate0 = (rowData, { rowIndex }) => <p>{rowData.userId?.name}</p>;
    const defaultTemplate1 = (rowData, { rowIndex }) => <p>{rowData.countryCode}</p>;
    const defaultTemplate2 = (rowData, { rowIndex }) => <p>{rowData.operatorCode}</p>;
    const defaultTemplate3 = (rowData, { rowIndex }) => <p>{rowData.number}</p>;
    const dropdownArrayTemplate4 = (rowData, { rowIndex }) => <p>{rowData.type}</p>;
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
            >
                <Column field="userId" header="User" body={dropdownTemplate0} filter={selectedFilterFields.includes('userId')} hidden={selectedHideFields?.includes('userId')} style={{ minWidth: '8rem' }} />
                <Column field="countryCode" header="Countrycode" body={defaultTemplate1} filter={selectedFilterFields.includes('countryCode')} hidden={selectedHideFields?.includes('countryCode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="operatorCode" header="Operatorcode" body={defaultTemplate2} filter={selectedFilterFields.includes('operatorCode')} hidden={selectedHideFields?.includes('operatorCode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="number" header="Number" body={defaultTemplate3} filter={selectedFilterFields.includes('number')} hidden={selectedHideFields?.includes('number')} sortable style={{ minWidth: '8rem' }} />
                <Column field="type" header="Type" body={dropdownArrayTemplate4} filter={selectedFilterFields.includes('type')} hidden={selectedHideFields?.includes('type')} style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload UserPhones Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search UserPhones" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default UserPhonesDataTable;
