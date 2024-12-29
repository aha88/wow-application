import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {customersData, sessionV, tokenV } from '@/store/authuser';
import  { useRouter } from 'next/router';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';
import userService from '../../services/userService'; 
import MyCounter from '@/component/MyCounter';
import MyDataTable from '@/component/MyDataTable';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (customersData.value == null ){

            const fetchUserData = async () => {
                setLoading(true);
                const token = tokenV.value ?? sessionStorage.getItem('tk');
                const id= sessionStorage.getItem('id');

                try {
                    const userData = await userService.fetchUserData(id, token);  // Call the service
                    setData(userData);  
                    customersData.value = userData
                } catch (err) {
                    setError(err.message);  // Set error state
                } finally {
                    setLoading(false);  // Set loading to false
                }
            };
            
            fetchUserData();
        }
    }, [sessionV.value, tokenV.value, router,loading]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>
                            <h2>
                                Dashboard
                            </h2>
                        </CCardTitle>
                    </CCol>
                </CRow>
                <CRow>
                        <MyCounter title="Leave" number={50} btn={true}/>
                        <MyCounter title="Leave Entitlement" number={50} btn={true}/>
                        <MyCounter title="Taken" number={50} btn={true}/>
                        <MyCounter title="Balance" number={50} btn={true}/>
                </CRow>

                <CRow>
                    <CCol md={12}>
                        <MyDataTable
                            data={data}
                        />
                    </CCol>
                </CRow>

            </CContainer>
        </div>
    );
};

export default Dashboard;

