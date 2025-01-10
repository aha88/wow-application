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
    const [employeesValue, setEmployeeV] = useAtom(employeeV);
    const [dashboardCountValue, setDashboardCountV] = useAtom(dashboardCountV);
    const [dashboardConditionValue, setDashboardConditionV] = useState([]);
    const [tokenValue, setTokenV] = useAtom(tokenV);
    const [sessionValue, setSessionV] = useAtom(sessionV);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        let timeoutId;

        const fetchAllData = async () => {
            try {
                setLoading(true);

                // Session timeout handling
                if (!employeesValue) {
                    sessionStorage.clear();
                    setSessionV(false);
                    setTokenV([]);
                    router.push('/');
                    return;
                }

                // Fetch only if necessary
                const fetchPromises = [];

                if (employeesValue.length === 0) {
                    fetchPromises.push(companiesService.fetchCompaniesData(tokenValue).then(res => setEmployeeV(res.data)));
                }
                
                if (dashboardCountValue.length === 0) {
                    fetchPromises.push(dashboardsService.fetchDashboardData(tokenValue).then(res => setDashboardCountV(res.data)));
                }

                if (dashboardConditionValue.length === 0) {
                    fetchPromises.push(dashboardsService.fetchDashboardCountCondition(tokenValue).then(res => setDashboardConditionV(res.data)));
                }

                await Promise.all(fetchPromises);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        timeoutId = setTimeout(fetchAllData, 8000); // Delay execution by 8 seconds

        return () => clearTimeout(timeoutId); // Cleanup on unmount

    }, [employeesValue, dashboardCountValue, dashboardConditionValue]);

    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <CContainer className="mt-3">
            <CRow className="mt-3">
                <CCol md={12}>
                    <CCardTitle>Dashboard</CCardTitle>
                </CCol>
            </CRow>

            {/* Dynamic Counters */}
            <CRow className="mt-3">
                {dashboardConditionValue?.map((dt, i) => (
                    <MyCounter key={i} number={dt.count} btn={false} title={dt.conditionName} />
                ))}
            </CRow>

            <hr className="border" />

            {/* Summary & Latest Company Table */}
            <CRow className="mt-4">
                {(employeesValue?.length > 0 || dashboardCountValue?.length > 0) && (
                    <CCol md={3}>
                        <MyCounter
                            title="TOTAL OF COMPANY"
                            number={employeesValue?.length || 0}
                            btn={false}
                            mdSize={12}
                            classColorName="bg-light text-dark text-center"
                        />
                        <MyCounter
                            title="TOTAL OF EMPLOYEE SIGNUP"
                            number={dashboardCountValue[1]?.all_employee_count || 0}
                            btn={false}
                            mdSize={12}
                            classColorName="bg-dark text-light text-center"
                        />
                    </CCol>
                )}

                {/* Company Latest Table */}
                <CCol md={9} className="mb-4">
                    <div className="boxcontainer p-3 text-black">
                        <CCardTitle className="mb-3">Company Latest</CCardTitle>
                        {employeesValue.length > 0 && (
                            <MyDataTable data={employeesValue} onView={handleView} />
                        )}
                    </div>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Dashboard;