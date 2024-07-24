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

const CompanyAddressesDataTable = ({
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

    const dropdownTemplate0 = (rowData, { rowIndex }) => <p>{rowData.companyId?.name}</p>;
    const inputTextareaTemplate1 = (rowData, { rowIndex }) => <p>{rowData.Street1}</p>;
    const inputTextareaTemplate2 = (rowData, { rowIndex }) => <p>{rowData.Street2}</p>;
    const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.Poscode}</p>;
    const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.City}</p>;
    const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.State}</p>;
    const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.Province}</p>;
    const pTemplate7 = (rowData, { rowIndex }) => <p>{rowData.Country}</p>;
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
                <Column field="companyId" header="Company" body={dropdownTemplate0} filter={selectedFilterFields.includes('companyId')} hidden={selectedHideFields?.includes('companyId')} style={{ minWidth: '8rem' }} />
                <Column field="Street1" header="Street1" body={inputTextareaTemplate1} filter={selectedFilterFields.includes('Street1')} hidden={selectedHideFields?.includes('Street1')} sortable style={{ minWidth: '8rem' }} />
                <Column field="Street2" header="Street2" body={inputTextareaTemplate2} filter={selectedFilterFields.includes('Street2')} hidden={selectedHideFields?.includes('Street2')} sortable style={{ minWidth: '8rem' }} />
                <Column field="Poscode" header="Poscode" body={pTemplate3} filter={selectedFilterFields.includes('Poscode')} hidden={selectedHideFields?.includes('Poscode')} sortable style={{ minWidth: '8rem' }} />
                <Column field="City" header="City" body={pTemplate4} filter={selectedFilterFields.includes('City')} hidden={selectedHideFields?.includes('City')} sortable style={{ minWidth: '8rem' }} />
                <Column field="State" header="State" body={pTemplate5} filter={selectedFilterFields.includes('State')} hidden={selectedHideFields?.includes('State')} sortable style={{ minWidth: '8rem' }} />
                <Column field="Province" header="Province" body={pTemplate6} filter={selectedFilterFields.includes('Province')} hidden={selectedHideFields?.includes('Province')} sortable style={{ minWidth: '8rem' }} />
                <Column field="Country" header="Country" body={pTemplate7} filter={selectedFilterFields.includes('Country')} hidden={selectedHideFields?.includes('Country')} sortable style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload CompanyAddresses Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search CompanyAddresses" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default CompanyAddressesDataTable;
