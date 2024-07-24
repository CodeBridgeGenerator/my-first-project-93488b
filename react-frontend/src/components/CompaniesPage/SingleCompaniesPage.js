import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import client from '../../services/restClient';
import { Tag } from 'primereact/tag';
import moment from 'moment';
import { InputText } from 'primereact/inputtext';
import ProjectLayout from '../Layouts/ProjectLayout';

import BranchesPage from '../BranchesPage/BranchesPage';
import DepartmentsPage from '../DepartmentsPage/DepartmentsPage';
import ProfilesPage from '../ProfilesPage/ProfilesPage';
import CompanyAddressesPage from '../CompanyAddressesPage/CompanyAddressesPage';
import CompanyPhonesPage from '../CompanyPhonesPage/CompanyPhonesPage';

const SingleCompaniesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service('companies')
            .get(urlParams.singleCompaniesId, {
                query: {
                    $populate: [
                        {
                            path: 'createdBy',
                            service: 'users',
                            select: ['name']
                        },
                        {
                            path: 'updatedBy',
                            service: 'users',
                            select: ['name']
                        },
                        'addresses'
                    ]
                }
            })
            .then((res) => {
                set_entity(res || {});
                const addresses = Array.isArray(res.addresses)
                    ? res.addresses.map((elem) => ({
                          _id: elem._id,
                          Street1: elem.Street1
                      }))
                    : res.addresses
                      ? [{ _id: res.addresses._id, Street1: res.addresses.Street1 }]
                      : [];
                setAddresses(addresses);
            })
            .catch((error) => {
                props.alert({
                    title: 'Companies',
                    type: 'error',
                    message: error.message || 'Failed get companies'
                });
            });
    }, [props, urlParams.singleCompaniesId]);

    const goBack = () => {
        navigate('/companies');
    };

    return (
        <ProjectLayout>
            <div className="col-12 flex flex-column align-items-center">
                <div className="col-10">
                    <div className="flex align-items-center justify-content-start">
                        <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                        <h3 className="m-0">Companies</h3>
                    </div>
                    <p>companies/{urlParams.singleCompaniesId}</p>
                    {/* ~cb-project-dashboard~ */}
                </div>
                <div className="card w-full">
                    <div className="grid ">
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Name</label>
                            <p className="m-0 ml-3">{_entity?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Company no</label>
                            <p className="m-0 ml-3">{_entity?.companyNo}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">New company number</label>
                            <p className="m-0 ml-3">{Number(_entity?.newCompanyNumber)}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Date Incorporated</label>
                            <p id="DateIncorporated" className="m-0 ml-3">
                                {_entity?.DateIncorporated}
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm text-primary">Is default</label>
                            <p className="m-0 ml-3">
                                <i id="isdefault" className={`pi ${_entity?.isdefault ? 'pi-check' : 'pi-times'}`}></i>
                            </p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <label className="text-sm">Addresses</label>

                            {addresses.map((elem) => (
                                <Link key={elem._id} to={`/companyAddresses/${elem._id}`}>
                                    <div className="card">
                                        <p className="text-xl text-primary">{elem.Street1}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="col-12">&nbsp;</div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="created By:"></Tag>
                            <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="created At:"></Tag>
                            <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="last Updated By:"></Tag>
                            <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                        </div>
                        <div className="col-12 md:col-6 lg:col-3">
                            <Tag value="updated At:"></Tag>
                            <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <BranchesPage />
            <DepartmentsPage />
            <ProfilesPage />
            <CompanyAddressesPage />
            <CompanyPhonesPage />
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(SingleCompaniesPage);
