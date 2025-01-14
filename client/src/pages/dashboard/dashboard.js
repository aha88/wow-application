import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { CCardTitle, CCol, CContainer, CRow } from '@coreui/react';
import { useAtom } from 'jotai';
import companiesService from '../../services/companiesService';
import dashboardsService from '../../services/dashboardsService';
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
import { tokenV, sessionV, employeeV, dashboardCountV } from "../../store/authuser";
import LoadingPage from '@/component/LoadingPage';
import FailPage from '@/component/FailPage';

const Dashboard = () => {
    const router = useRouter();

    // Atoms for global state management
    const [employeesValue, setEmployeeV] = useAtom(employeeV);
    const [dashboardCountValue, setDashboardCountV] = useAtom(dashboardCountV);
    const [tokenValue, setTokenV] = useAtom(tokenV);
    const [sessionValue, setSessionV] = useAtom(sessionV);

    // Local state
    const [dashboardConditionValue, setDashboardConditionV] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    /**
     * Fetch all necessary data from APIs.
     */
    const fetchAllData = useCallback(async () => {
        try {
            setLoading(true);

            // Handle session timeout
            if (!employeesValue) {
                sessionStorage.clear();
                setSessionV(false);
                setTokenV([]);
                router.push('/');
                return;
            }

            const fetchPromises = [];

            if (!employeesValue.length) {
                fetchPromises.push(companiesService.fetchCompaniesData(tokenValue).then(res => setEmployeeV(res.data)));
            }

            if (!dashboardCountValue.length) {
                fetchPromises.push(dashboardsService.fetchDashboardData(tokenValue).then(res => setDashboardCountV(res.data)));
            }

            if (!dashboardConditionValue.length) {
                fetchPromises.push(dashboardsService.fetchDashboardCountCondition(tokenValue).then(res => setDashboardConditionV(res.data)));
            }

            await Promise.all(fetchPromises);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [employeesValue, dashboardCountValue, dashboardConditionValue, tokenValue, router, setDashboardConditionV, setDashboardCountV, setEmployeeV]);

    /**
     * Runs only once when the component mounts.
     */
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    /**
     * Columns configuration for the table.
     */
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, width: "80px" },
        { name: 'Company Name', selector: row => row.name, sortable: true },
        { name: 'Registration Number', selector: row => row.registration_number, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
    ];

    /**
     * Handles row view click.
     */
    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    /**
     * Render loading and error states.
     */
    if (loading) return <LoadingPage />;
    if (error) return <FailPage failmsg={error} />;

    return (
    <div className='body'>
        <CContainer className="mt-3">
            {/* Dashboard Title */}
            <CRow className="mt-3">
                <CCol md={12}>
                    <CCardTitle>Dashboard</CCardTitle>
                </CCol>
            </CRow>

            {/* Dynamic Counters */}
            <CRow className="mt-3">
                {dashboardConditionValue?.slice(0, 4).map((dt, i) => (
                    <MyCounter key={i} number={dt.count} btn={false} title={dt.conditionName} />
                ))}
            </CRow>

            <hr className="border" />

            {/* Summary & Latest Company Table */}
            <CRow className="mt-4">
                {(employeesValue?.length > 0 || dashboardCountValue?.length > 0) && (
                    <CCol md={3}>
                        <MyCounter
                            title="TOTAL OF COMPANIES"
                            number={employeesValue?.length || 0}
                            btn={false}
                            mdSize={12}
                            classColorName="bg-light text-dark text-center"
                        />
                        <MyCounter
                            title="TOTAL OF PARTICIPANTS SIGNUP"
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
                            <MyDataTable data={employeesValue} onView={handleView} columns={columns} />
                        )}
                    </div>
                </CCol>
            </CRow>
        </CContainer>
        </div>
    );
};

export default Dashboard;
