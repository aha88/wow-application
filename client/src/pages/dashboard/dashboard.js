import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';
import companiesService from '../../services/companiesService'; 
import dashboardsService from '../../services/dashboardsService'; 
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
import { tokenV, sessionV, employeeV, dashboardCountV } from "../../store/authuser";
import { useAtom } from 'jotai';

const Dashboard = () => {
    const [tokenValue] = useAtom(tokenV);
    const [sessionValue] = useAtom(sessionV);
    const [employeesValue, setEmployeeV] = useAtom(employeeV);
    const [dashboardCountValue, setDashboardCountV] = useAtom(dashboardCountV);

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

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (dashboardCountValue?.length === 0) {
                setLoading(true);
                try {
                    const dashboardData = await dashboardsService.fetchDashboardData(tokenValue);
                    setDashboardCountV(dashboardData.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [dashboardCountValue]);

    const handleDelete = () => {
        // Implement delete functionality
    };

    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (<>
        <div className='body'>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>Dashboard</CCardTitle>
                    </CCol>
                </CRow>

                <CRow className='mt-4'>
                    <CCol md={3}>
                        <MyCounter
                            title="TOTAL OF COMPANY"
                            number={employeesValue?.length || 0}
                            btn={false}
                            mdSize={12}
                            classColorName="bg-light text-dark text-center font-weight-bold"
                        />
                        <MyCounter
                            title="TOTAL OF EMPLOYEE SIGNUP"
                            number={dashboardCountValue[1]?.all_employee_count || 0}
                            btn={false}
                            mdSize={12}
                            classColorName="bg-dark text-light text-center font-weight-bold"
                        />
                    </CCol>
                    <CCol md={9}>
                        {employeesValue && (
                            <MyDataTable
                                data={employeesValue.length > 0 ? employeesValue : []}
                                onDelete={handleDelete}
                                onView={handleView}
                            />
                        )}
                    </CCol>
                </CRow>
            </CContainer>
        </div>
        </>);
};

export default Dashboard;
