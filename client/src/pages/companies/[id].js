import React, { useState, useEffect } from 'react';
import { CCol, CContainer, CRow, CCardTitle, CListGroup,CListGroupItem } from '@coreui/react';
import { tokenV, compUser } from "../../store/authuser";
import { useAtom } from 'jotai';
import MyCounter from '@/component/MyCounter';
import  dashboardsService   from '@/services/dashboardsService';
import  eventsService  from '@/services/eventsService';
import  companiesService from '@/services/companiesService';
import MyDataTable from '@/component/MyDataTable';

const Companyid = ({ userOne }) => {
    const [tokenValue] = useAtom(tokenV);
    const [compUserValue, setCompUserValue] = useAtom(compUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true; // To track component mount state

        const fetchCompanyData = async () => {
            setLoading(true);
            try {
                const companiesData = await companiesService.fetchCompanyID(tokenValue, userOne);
                const companiesIDCounterData = await dashboardsService.dashboardCountID(tokenValue, userOne);
                const eventIDData = await eventsService.fetcheventIDdData(tokenValue, userOne);
                
                if (!isMounted) return;

                if (companiesData.data.length > 0) {
                    const compID = companiesData.data[0];
                    const counter = companiesIDCounterData.data || [];
                    const event = eventIDData.data || [];

                    const arr = [
                        { comp: compID || {} },   
                        { counter: Array.isArray(counter) ? [...counter] : counter },
                        { event: Array.isArray(event) ? [...event] : event }  
                    ]
                        
                    setCompUserValue(arr);
                    console.log(arr);
                } else {
                    setError('No company data found');
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchCompanyData();

        return () => {
            isMounted = false; // Cleanup function to prevent state updates
        };
    }, [tokenValue, userOne]); // Add dependencies

    return (
        <>
            <div className='body'>
                <CContainer className='mt-3'>
                <CRow className="mt-5">
                    <CCol md={12}>
                        <CCardTitle>Company Information</CCardTitle>
                    </CCol>
                    <CCol className='mt-3'>
                        <CListGroup flush>
                            <span>
                                <strong>Name:</strong> {compUserValue[0]?.comp?.name}
                            </span>
                            <span>
                                <strong>Registration No:</strong> {compUserValue[0]?.comp?.registration_number}
                            </span>
                            <span>
                                <strong>Email:</strong> {compUserValue[0]?.comp?.email}
                            </span>
                            <span>
                                <strong>Phone:</strong> {compUserValue[0]?.comp?.phone}
                            </span>
                        <br/>
                        </CListGroup>
                    </CCol>
                </CRow>


                    <CRow className='mt-3'>
                        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : 
                            <>
                                {compUserValue[1].counter.map((dt,i) => {
                                    if(i < 4){
                                        return <React.Fragment key={i}>
                                            <MyCounter number={dt.count} btn={false} title={dt.conditionName} />
                                        </React.Fragment>
                                    }
                                })}
                            </>                            
                        }
                    </CRow>
                    <hr/>
                    <CRow className='mt-4'>
                        <CCol md={12} className='mb-3'>
                            <CCardTitle>Events Name</CCardTitle>
                        </CCol>

                        <CCol md={12}>
                            <div className='boxcontainer p-3 text-black'>

                                {compUserValue[2] && (
                                    <>
                                        <MyDataTable
                                            data={compUserValue[2]?.event?.length > 0 ? compUserValue[2]?.event : []}
                                            // onView={handleView} 
                                            />
                                    </>
                                )}
                            </div>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    );
};

export default Companyid;

export const getServerSideProps = async ({ params }) => {
    const id = params.id;

    return {
        props: { userOne: id },
    };
};
