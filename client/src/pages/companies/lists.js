import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CButton, CCardTitle, CCol, CContainer, CFormLabel, CRow } from '@coreui/react';
import companiesService from '../../services/companiesService'; 
import dashboardsService from '../../services/eventsService'; 
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
import { tokenV, sessionV, companiesList, dashboardCountV } from "../../store/authuser";
import { useAtom } from 'jotai';
import LoadingPage from '@/component/LoadingPage';
import FailPage from '@/component/FailPage';

const Lists = () => {
    const [tokenValue] = useAtom(tokenV);
    const [companiesListValue, setCompaniesList] = useAtom(companiesList);
 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();


    useEffect(() => {
        let isMounted = true;

        const fetchCompanyData = async () => {
            setLoading(true);
            try {
                const companiesData = await companiesService.fetchCompaniesData(tokenValue);
                if (!isMounted) return;
                setCompaniesList(companiesData.data);
            } catch (err) {
                    if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCompanyData();
        return () => {
            isMounted = false; 
        };
    }, [tokenValue]);

    const columns = [
        {
          name: 'ID',
          selector: row => row.id,
          sortable: true,
        },
        {
          name: 'Company Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Registration Number',
          selector: row => row.registration_number,
          sortable: true,
        },
        {
          name: 'Email',
          selector: row => row.email,
          sortable: true,
        },
    ];

    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    if (loading) return <LoadingPage />;
    if (error) return <FailPage failmsg={error} />;

    return (<>
            <div className='body'>
            <CContainer className='mt-3'>
                <CRow className="mt-5">
                        <CCol md={12} className='mb-3'></CCol>
                        <CCol md={12}>
                            <CCardTitle className='fs-2'>Company</CCardTitle>
                        </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <CCol md={12} className='mb-4'>
                        <div className='boxcontainer p-3 text-black'>
                            <CRow>
                                <CCol md={6}>
                                    <CCardTitle className='mb-3'>Lists</CCardTitle>
                                </CCol>
                                <CCol md={6}>
                                    <CButton color='primary' size='sm' className='float-right mb-3 full-width pl-3' onClick={() => router.push('/companies/add')}>+ Add Company</CButton>
                                </CCol>
                            </CRow>
                            
                            {companiesListValue && (
                                <>
                                    <MyDataTable
                                        data={companiesListValue.length > 0 ? companiesListValue : []}
                                        onView={handleView}
                                        columns={columns}
                                        />
                                </>
                            )} 
                        </div>
                    </CCol>

                </CRow>
            </CContainer>
            </div>
        </>);
};

export default Lists;
