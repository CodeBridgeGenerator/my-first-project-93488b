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

const DynaFieldsDataTable = ({
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

    const dropdownTemplate0 = (rowData, { rowIndex }) => <p>{rowData.dynaLoader?.name}</p>;
    const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.from}</p>;
    const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.fromType}</p>;
    const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.to2}</p>;
    const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.toType}</p>;
    const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.toService}</p>;
    const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.toRefService}</p>;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;

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
                alwaysShowPaginator={!urlParams.singleUsersId}
            >
                <Column field="dynaLoader" header="From" body={dropdownTemplate0} filter={selectedFilterFields.includes('dynaLoader')} hidden={selectedHideFields?.includes('dynaLoader')} style={{ minWidth: '8rem' }} />
                <Column field="from" header="Field" body={pTemplate1} filter={selectedFilterFields.includes('from')} hidden={selectedHideFields?.includes('from')} sortable style={{ minWidth: '8rem' }} />
                <Column field="fromType" header="Type" body={pTemplate2} filter={selectedFilterFields.includes('fromType')} hidden={selectedHideFields?.includes('fromType')} style={{ minWidth: '8rem' }} />
                <Column field="to2" header="To" body={pTemplate3} filter={selectedFilterFields.includes('to2')} hidden={selectedHideFields?.includes('to2')} sortable style={{ minWidth: '8rem' }} />
                <Column field="toType" header="Type" body={pTemplate4} filter={selectedFilterFields.includes('toType')} hidden={selectedHideFields?.includes('toType')} sortable style={{ minWidth: '8rem' }} />
                <Column field="fromRefService" header="Service" body={pTemplate5} filter={selectedFilterFields.includes('fromRefService')} hidden={selectedHideFields?.includes('fromRefService')} sortable style={{ minWidth: '8rem' }} />
                <Column field="toRefService" header="To Ref Service" body={pTemplate6} filter={selectedFilterFields.includes('toRefService')} hidden={selectedHideFields?.includes('toRefService')} sortable style={{ minWidth: '8rem' }} />
                <Column header="Delete" body={deleteTemplate} />
            </DataTable>
            <Dialog header="Upload DynaFields Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search DynaFields" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default DynaFieldsDataTable;
