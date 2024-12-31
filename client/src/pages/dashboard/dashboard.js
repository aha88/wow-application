import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {customersData,userData, sessionV, userID, tokenV } from '@/store/authuser';
import  { useRouter } from 'next/router';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';
import companiesService from '../../services/companiesService'; 
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
 

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('tk');
        if (storedToken) {
            tokenV.value = storedToken;  
        }
    }, []);

    useEffect(() => {
        if (customersData.value == null ){

            const fetchCompanyData = async () => {
                setLoading(true);
                const token = tokenV.value ?? sessionStorage.getItem('tk');
                try {
                    const companiesData = await companiesService.fetchCompaniesData(token);  // Call the service
                    setData(companiesData);
                    customersData.value = companiesData
                } catch (err) {
                    setError(err.message);  // Set error state
                } finally {
                    setLoading(false);  // Set loading to false
                }
            };
            
            fetchCompanyData();
        }
    }, [sessionV.value, tokenV.value, router,loading],data);

    const handleDelete = () => {

    }
    const handleview = () => {

    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>
                                Dashboard
                        </CCardTitle>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol>
                    </CCol>
                </CRow>
               
                <CRow>
                    <CCol md={12}>
                        <MyDataTable data={data.data} onDelete={handleDelete} onView={handleview} />
                    </CCol>
                </CRow>

            </CContainer>
        </div>
    );
};

export default Dashboard;

