import React, { useState, useEffect } from 'react';
import { CCol, CContainer, CRow, CButton, CCardTitle, CListGroup,CListGroupItem } from '@coreui/react';
import { tokenV, compUser } from "../../../store/authuser";
import { useAtom } from 'jotai';
import MyCounter from '@/component/MyCounter';
import  dashboardsService   from '@/services/dashboardsService';
import  eventsService  from '@/services/eventsService';
import  companiesService from '@/services/companiesService';
import MyDataTable from '@/component/MyDataTable';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft} from '@coreui/icons';
import LoadingPage from '@/component/LoadingPage';

const Companyid = ({ userOne }) => {
    const [tokenValue] = useAtom(tokenV);
    const [compUserValue, setCompUserValue] = useAtom(compUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        let isMounted = true;

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
            isMounted = false;  
        };
    }, [tokenValue, userOne]); 

    const columnsTrainee = [
        {
          name: 'ID',
          selector: row => row.event_id,
          sortable: true,
        },
    ]

    const columns = [
        {
          name: 'ID',
          selector: row => row.event_id,
          sortable: true,
        },
        {
          name: 'Event Name',
          selector: row => row.details,
          sortable: true,
        },
        {
          name: 'Event Date',
          selector: row => row.date,
          sortable: true,
        },
        {
          name: 'Event Time',
          selector: row => row.time,
          sortable: true,
        },
        {
          name: 'Event Venue',
          selector: row => row.venue,
          sortable: true,
        },
    ];

    const handleView = (e) => {
        router.push(`../companies/${userOne}/${e.event_id}`);
    };


    if (loading) return <LoadingPage/>;
    
    return (
        <>
            <div className='body'>
                <CContainer className='mt-3'>
                    <CRow className="mt-5">
                        <CCol md={12} className='mb-3'>
                            <Link href='/companies/lists'> <CIcon customClassName="nav-icon" size='sm' height={25} width={25} icon={cilArrowLeft} /> 
                                 Back to Company Lists
                            </Link>
                        </CCol>
                        <CCol md={12}>
                            <CCardTitle className='fs-2'>Company Information</CCardTitle>
                        </CCol>
                        <CCol className='mt-3'>
                            <CListGroup flush className='text-white-50'>
                                <span>
                                    <strong>Company Name:</strong> {compUserValue[0]?.comp?.name}
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
                                {compUserValue[0]?.comp?.address1 ?
                                <span>
                                    <strong>Address:</strong><br/> 
                                    {compUserValue[0]?.comp?.address1}
                                    {compUserValue[0]?.comp?.address2}
                                    {compUserValue[0]?.comp?.city}{compUserValue[0]?.comp?.state}
                                    {compUserValue[0]?.comp?.postcode}
                                </span>
                                :''}
                            <br/>
                            </CListGroup>
                        </CCol>
                    </CRow>

                    <hr/>
                    <CRow className='mt-4'>
                        
                         <CRow>
                            <CCol md={6}>
                                <CCardTitle className='mb-3'>Trainer Assignee</CCardTitle>
                            </CCol>
                            <CCol md={6}>
                                <CButton color="light" variant="outline" size='sm' className='float-right mb-3 full-width pl-3' onClick={() => router.push('/companies/add')}>+ Add Event</CButton>
                            </CCol>
                        </CRow>

                        <CCol md={12}>
                            <div className='boxcontainer p-3 text-black'>

                                {compUserValue[2] && (
                                    <>
                                        <MyDataTable
                                            data={compUserValue[2]?.event?.length > 0 ? compUserValue[2]?.event : []}
                                            onView={handleView} 
                                            columns={columnsTrainee}
                                            />
                                    </>
                                )}
                            </div>
                        </CCol>
                    </CRow>

                    <hr/>
                    <CRow className='mt-3'>
                        {loading ? <LoadingPage/> : error ? <p>{error}</p> : 
                            <>
                                <CCardTitle className='mb-3'>Top 4 Conditions</CCardTitle>
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
                         <CRow>
                            <CCol md={6}>
                                <CCardTitle className='mb-3'>Event List</CCardTitle>
                            </CCol>
                            <CCol md={6}>
                                <CButton color="light" variant="outline" size='sm' className='float-right mb-3 full-width pl-3' onClick={() => router.push('/companies/add')}>+ Add Event</CButton>
                            </CCol>
                        </CRow>

                        <CCol md={12}>
                            <div className='boxcontainer p-3 text-black'>

                                {compUserValue[2] && (
                                    <>
                                        <MyDataTable
                                            data={compUserValue[2]?.event?.length > 0 ? compUserValue[2]?.event : []}
                                            onView={handleView} 
                                            columns={columns}
                                            searchTxt={true}
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
