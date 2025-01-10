import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CButton, CCardTitle, CCol, CContainer, CFormLabel, CRow } from '@coreui/react';
import companiesService from '../../services/companiesService'; 
import dashboardsService from '../../services/eventsService'; 
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
import { tokenV, sessionV, employeeV, dashboardCountV } from "../../store/authuser";
import { useAtom } from 'jotai';

const Company = () => {
    const [tokenValue] = useAtom(tokenV);
    const [employeesValue, setEmployeeV] = useAtom(employeeV);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();


    useEffect(() => {
        const fetchCompanyData = async () => {
            if (employeesValue?.length === 0) {
                setLoading(true);
                try {
                    const companiesData = await companiesService.fetchCompaniesData(tokenValue);
                    setEmployeeV(companiesData.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [employeesValue]);

    const handleDelete = () => {
        // Implement delete functionality
    };

    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (<>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>Companies</CCardTitle>
                    </CCol>
                </CRow>
              

                <CRow className='mt-4'>
              
                    
                    <CCol md={12} className='mb-4'>
                    <div className='boxcontainer p-3 text-black'>
                        <CRow>
                            <CCol md={6}>
                                <CCardTitle className='mb-3'>Company Latest</CCardTitle>
                            </CCol>
                            <CCol md={6}>
                                <CButton color='primary' className='float-right mb-3 full-width' onClick={() => router.push('/companies/add')}>Add</CButton>
                            </CCol>
                        </CRow>
                        

                        {employeesValue && (
                            <>
                                <MyDataTable
                                    data={employeesValue.length > 0 ? employeesValue : []}
                                    onView={handleView}
                                    />
                            </>
                        )}
                    </div>
                    </CCol>

                </CRow>
            </CContainer>
        </>);
};

export default Company;
