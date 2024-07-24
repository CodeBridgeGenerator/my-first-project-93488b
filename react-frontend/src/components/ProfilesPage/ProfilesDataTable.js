import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

import { Chip } from 'primereact/chip';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import UploadService from '../../services/uploadService';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import DownloadCSV from '../../utils/DownloadCSV';

const ProfilesDataTable = ({
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
    const dropdownTemplate1 = (rowData, { rowIndex }) => <p>{rowData.userId?.name}</p>;
    const imageTemplate2 = (rowData, { rowIndex }) => <Image src={rowData.image} alt="Image" height="60px" />;
    const inputTextareaTemplate3 = (rowData, { rowIndex }) => <p>{rowData.bio}</p>;
    const dropdownTemplate4 = (rowData, { rowIndex }) => <p>{rowData.department?.name}</p>;
    const tickTemplate5 = (rowData, { rowIndex }) => <i className={`pi ${rowData.hod ? 'pi-check' : 'pi-times'}`}></i>;
    const dropdownTemplate6 = (rowData, { rowIndex }) => <p>{rowData.section?.name}</p>;
    const tickTemplate7 = (rowData, { rowIndex }) => <i className={`pi ${rowData.hos ? 'pi-check' : 'pi-times'}`}></i>;
    const dropdownTemplate8 = (rowData, { rowIndex }) => <p>{rowData.position?.name}</p>;
    const dropdownTemplate9 = (rowData, { rowIndex }) => <p>{rowData.manager?.name}</p>;
    const dropdownTemplate10 = (rowData, { rowIndex }) => <p>{rowData.company?.name}</p>;
    const dropdownTemplate11 = (rowData, { rowIndex }) => <p>{rowData.branch?.name}</p>;
    const chipTemplate12 = (rowData, { rowIndex }) => <Chip label={rowData.skills} />;
    const dropdownTemplate13 = (rowData, { rowIndex }) => <p>{rowData.address?.Street1}</p>;
    const dropdownTemplate14 = (rowData, { rowIndex }) => <p>{rowData.phone?.number}</p>;
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
            >
                <Column field="name" header="Name" body={pTemplate0} filter={selectedFilterFields.includes('name')} hidden={selectedHideFields?.includes('name')} sortable style={{ minWidth: '8rem' }} />
                <Column field="userId" header="User" body={dropdownTemplate1} filter={selectedFilterFields.includes('userId')} hidden={selectedHideFields?.includes('userId')} style={{ minWidth: '8rem' }} />
                <Column field="image" header="Image" body={imageTemplate2} filter={selectedFilterFields.includes('image')} hidden={selectedHideFields?.includes('image')} sortable style={{ minWidth: '8rem' }} />
                <Column field="bio" header="Bio" body={inputTextareaTemplate3} filter={selectedFilterFields.includes('bio')} hidden={selectedHideFields?.includes('bio')} sortable style={{ minWidth: '8rem' }} />
                <Column field="department" header="Department" body={dropdownTemplate4} filter={selectedFilterFields.includes('department')} hidden={selectedHideFields?.includes('department')} style={{ minWidth: '8rem' }} />
                <Column field="hod" header="Head of Department" body={tickTemplate5} filter={selectedFilterFields.includes('hod')} hidden={selectedHideFields?.includes('hod')} style={{ minWidth: '8rem' }} />
                <Column field="section" header="Section" body={dropdownTemplate6} filter={selectedFilterFields.includes('section')} hidden={selectedHideFields?.includes('section')} style={{ minWidth: '8rem' }} />
                <Column field="hos" header="Head of Section" body={tickTemplate7} filter={selectedFilterFields.includes('hos')} hidden={selectedHideFields?.includes('hos')} style={{ minWidth: '8rem' }} />
                <Column field="position" header="Position" body={dropdownTemplate8} filter={selectedFilterFields.includes('position')} hidden={selectedHideFields?.includes('position')} style={{ minWidth: '8rem' }} />
                <Column field="manager" header="Manager" body={dropdownTemplate9} filter={selectedFilterFields.includes('manager')} hidden={selectedHideFields?.includes('manager')} style={{ minWidth: '8rem' }} />
                <Column field="company" header="Company" body={dropdownTemplate10} filter={selectedFilterFields.includes('company')} hidden={selectedHideFields?.includes('company')} style={{ minWidth: '8rem' }} />
                <Column field="branch" header="Branch" body={dropdownTemplate11} filter={selectedFilterFields.includes('branch')} hidden={selectedHideFields?.includes('branch')} style={{ minWidth: '8rem' }} />
                <Column field="skills" header="Skills" body={chipTemplate12} filter={selectedFilterFields.includes('skills')} hidden={selectedHideFields?.includes('skills')} sortable style={{ minWidth: '8rem' }} />
                <Column field="address" header="Address" body={dropdownTemplate13} filter={selectedFilterFields.includes('address')} hidden={selectedHideFields?.includes('address')} style={{ minWidth: '8rem' }} />
                <Column field="phone" header="Phone" body={dropdownTemplate14} filter={selectedFilterFields.includes('phone')} hidden={selectedHideFields?.includes('phone')} style={{ minWidth: '8rem' }} />
                <Column header="Edit" body={editTemplate} />
                <Column header="Delete" body={deleteTemplate} />
                {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
                {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            </DataTable>
            <Dialog header="Upload Profiles Data" visible={showUpload} onHide={() => setShowUpload(false)}>
                <UploadService />
            </Dialog>

            <Dialog header="Search Profiles" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default ProfilesDataTable;
